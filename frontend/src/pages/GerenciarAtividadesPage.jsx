import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar  from '../components/ui/TopBar'
import TabNav  from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getMinhasTurmas } from '../services/turmaService'
import { getAtividades, removerAtividade } from '../services/atividadeService'
import { BsFilePdf } from 'react-icons/bs'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

function formatarPrazo(prazo) {
  if (!prazo) return 'Sem prazo'
  return new Date(prazo).toLocaleDateString('pt-BR')
}

export default function GerenciarAtividadesPage() {
  const navigate = useNavigate()
  const [professor, setProfessor]         = useState(null)
  const [turmas, setTurmas]               = useState([])
  const [atividades, setAtividades]       = useState([])
  const [filtroTurma, setFiltroTurma]     = useState('todas')
  const [confirmandoId, setConfirmandoId] = useState(null)
  const [carregando, setCarregando]       = useState(true)
  const [erro, setErro]                   = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
      setProfessor(dados)
      try {
        const [minhasTurmas, todasAtividades] = await Promise.all([
          getMinhasTurmas(),
          getAtividades(),
        ])
        setTurmas(minhasTurmas)
        const turmaIds = new Set(minhasTurmas.map(t => t.id))
        setAtividades(todasAtividades.filter(a => turmaIds.has(a.turma_id)))
      } catch {
        setErro('Erro ao carregar atividades.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [navigate])

  if (!professor) return null

  const turmaMap = {}
  turmas.forEach(t => { turmaMap[t.id] = t.nome })

  const atividadesFiltradas = filtroTurma === 'todas'
    ? atividades
    : atividades.filter(a => a.turma_id === filtroTurma)

  async function handleRemover(id) {
    try {
      await removerAtividade(id)
      setAtividades(prev => prev.filter(a => a.id !== id))
      setConfirmandoId(null)
    } catch {
      setErro('Erro ao remover atividade.')
      setConfirmandoId(null)
    }
  }

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={professor.nome}
        cargo={`Professor · ${professor.disciplina || 'Sem disciplina'}`}
        avatarCor={avatarCores.professor}
        avatarLetras={getIniciais(professor.nome)}
      />

      <TabNav abas={[
        { label: 'Início',        rota: '/dashboard/professor'  },
        { label: 'Minhas turmas', rota: '/professor/turmas'     },
        { label: 'Atividades',    rota: '/professor/atividades' },
        { label: 'Conteúdos',     rota: '/professor/conteudos'  },
        'Chat',
      ]} />

      <div className={dashStyles.corpo}>
        <div className={styles.cabecalho}>
          <div>
            <button className={styles.btnVoltar} onClick={() => navigate('/dashboard/professor')}>
              ← Painel
            </button>
            <h1 className={styles.titulo}>
              Atividades <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)' }}>({atividadesFiltradas.length})</span>
            </h1>
          </div>
          <button className={styles.btnNovo} onClick={() => navigate('/professor/atividades/nova')}>
            + Nova atividade
          </button>
        </div>

        <div className={styles.filtros}>
          <button
            className={`${styles.filtroBtn} ${filtroTurma === 'todas' ? styles.filtroBtnAtivo : ''}`}
            onClick={() => setFiltroTurma('todas')}
          >
            Todas <span className={styles.filtroCount}>{atividades.length}</span>
          </button>
          {turmas.map(t => (
            <button
              key={t.id}
              className={`${styles.filtroBtn} ${filtroTurma === t.id ? styles.filtroBtnAtivo : ''}`}
              onClick={() => setFiltroTurma(t.id)}
            >
              {t.nome}
              <span className={styles.filtroCount}>
                {atividades.filter(a => a.turma_id === t.id).length}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.lista}>
          {erro       && <p className={styles.erro}>{erro}</p>}
          {carregando && <p className={styles.vazio}>Carregando atividades...</p>}
          {!carregando && !erro && atividadesFiltradas.length === 0 && (
            <p className={styles.vazio}>Nenhuma atividade cadastrada.</p>
          )}

          {atividadesFiltradas.map(a => (
            <div key={a.id} className={styles.usuarioCard}>
              <div className={styles.usuarioAvatar} style={{ background: avatarCores.professor }}>
                {getIniciais(a.titulo)}
              </div>

              <div className={styles.usuarioInfo}>
                <p className={styles.usuarioNome}>{a.titulo}</p>
                <p className={styles.usuarioEmail}>
                  {turmaMap[a.turma_id] ?? '—'} · Prazo: {formatarPrazo(a.prazo)}
                </p>
              </div>

              <div className={styles.acoes}>
                {a.arquivo_url && (
                  <a
                    href={a.arquivo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 12,
                      color: 'var(--verde)',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    <BsFilePdf size={14} /> PDF
                  </a>
                )}
                {confirmandoId === a.id ? (
                  <>
                    <span className={styles.confirmarTexto}>Remover?</span>
                    <button className={styles.btnConfirmar} onClick={() => handleRemover(a.id)}>Sim</button>
                    <button className={styles.btnCancelarAcao} onClick={() => setConfirmandoId(null)}>Não</button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.btnEditar}
                      onClick={() => navigate(`/professor/atividades/${a.id}/entregas`)}
                    >
                      Entregas
                    </button>
                    <button className={styles.btnRemover} onClick={() => setConfirmandoId(a.id)}>
                      Remover
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
