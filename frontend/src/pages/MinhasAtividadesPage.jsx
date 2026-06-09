import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar  from '../components/ui/TopBar'
import TabNav  from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getAtividadesDaTurma } from '../services/atividadeService'
import { getNotasDoAluno } from '../services/notaService'
import dashStyles from './Dashboard.module.css'
import styles    from './Gerenciar.module.css'

function formatarPrazo(prazo) {
  if (!prazo) return 'Sem prazo'
  return new Date(prazo).toLocaleDateString('pt-BR')
}

function prazoPassado(prazo) {
  if (!prazo) return false
  return new Date(prazo) < new Date()
}

export default function MinhasAtividadesPage() {
  const navigate = useNavigate()
  const [aluno, setAluno]             = useState(null)
  const [atividades, setAtividades]   = useState([])
  const [entregasMap, setEntregasMap] = useState({})
  const [carregando, setCarregando]   = useState(true)
  const [erro, setErro]               = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'aluno') { navigate('/'); return }
      setAluno(dados)

      if (!dados.turma_id) {
        setCarregando(false)
        return
      }

      try {
        const [lista, entregas] = await Promise.all([
          getAtividadesDaTurma(dados.turma_id),
          getNotasDoAluno(dados.id),
        ])
        setAtividades(lista)
        const mapa = {}
        entregas.forEach(e => { mapa[e.atividade_id] = e })
        setEntregasMap(mapa)
      } catch {
        setErro('Erro ao carregar atividades.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [navigate])

  if (!aluno) return null

  const pendentes  = atividades.filter(a => !entregasMap[a.id])
  const entregues  = atividades.filter(a =>  entregasMap[a.id])

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={aluno.nome}
        cargo="Aluno"
        avatarCor={avatarCores.aluno}
        avatarLetras={getIniciais(aluno.nome)}
      />

      <TabNav abas={[
        { label: 'Início',      rota: '/dashboard/aluno'   },
        { label: 'Atividades',  rota: '/aluno/atividades'  },
        'Minhas aulas',
        'Chat',
        'Downloads',
      ]} />

      <div className={dashStyles.corpo}>
        <div className={styles.cabecalho}>
          <h1 className={styles.titulo}>
            Minhas Atividades
            <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)', marginLeft: 8 }}>
              ({atividades.length})
            </span>
          </h1>
        </div>

        {!aluno.turma_id && (
          <p className={styles.vazio}>Você ainda não está vinculado a nenhuma turma.</p>
        )}

        {erro && <p className={styles.erro}>{erro}</p>}
        {carregando && <p className={styles.vazio}>Carregando atividades...</p>}

        {!carregando && !erro && aluno.turma_id && (
          <>
            {pendentes.length > 0 && (
              <>
                <p className={dashStyles.secaoTitulo}>Pendentes ({pendentes.length})</p>
                <div className={styles.lista}>
                  {pendentes.map(a => (
                    <AtividadeCard
                      key={a.id}
                      atividade={a}
                      entrega={null}
                    />
                  ))}
                </div>
              </>
            )}

            {entregues.length > 0 && (
              <>
                <p className={dashStyles.secaoTitulo} style={{ marginTop: 24 }}>Entregues ({entregues.length})</p>
                <div className={styles.lista}>
                  {entregues.map(a => (
                    <AtividadeCard
                      key={a.id}
                      atividade={a}
                      entrega={entregasMap[a.id]}
                    />
                  ))}
                </div>
              </>
            )}

            {atividades.length === 0 && (
              <p className={styles.vazio}>Nenhuma atividade cadastrada para sua turma.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function AtividadeCard({ atividade, entrega }) {
  const vencida = !entrega && prazoPassado(atividade.prazo)

  return (
    <div className={styles.usuarioCard}>
      <div
        className={styles.usuarioAvatar}
        style={{ background: entrega ? 'var(--verde)' : vencida ? '#dc2626' : '#f59e0b' }}
      >
        {entrega ? '✓' : '!'}
      </div>

      <div className={styles.usuarioInfo}>
        <p className={styles.usuarioNome}>{atividade.titulo}</p>
        <p className={styles.usuarioEmail}>
          Prazo: {formatarPrazo(atividade.prazo)}
          {vencida && ' · Vencida'}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        {entrega ? (
          <>
            <span className={`${styles.perfilBadge} ${styles.badge_aluno}`}>Entregue</span>
            {entrega.nota !== null && entrega.nota !== undefined && (
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--verde)', minWidth: 40, textAlign: 'right' }}>
                {entrega.nota}
              </span>
            )}
          </>
        ) : (
          <span
            className={styles.perfilBadge}
            style={{ background: vencida ? '#fee2e2' : '#FEF3C7', color: vencida ? '#dc2626' : '#854F0B' }}
          >
            {vencida ? 'Vencida' : 'Pendente'}
          </span>
        )}
      </div>
    </div>
  )
}
