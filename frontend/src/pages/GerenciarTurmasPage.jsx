import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getTurmas, removerTurma } from '../services/turmaService'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

const labelTurno = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite' }
const corTurno   = { manha: '#F97316', tarde: '#EAB308', noite: '#8B5CF6' }

export default function GerenciarTurmasPage() {
  const navigate = useNavigate()
  const [diretor, setDiretor]             = useState(null)
  const [turmas, setTurmas]               = useState([])
  const [filtro, setFiltro]               = useState('todos')
  const [confirmandoId, setConfirmandoId] = useState(null)
  const [carregando, setCarregando]       = useState(true)
  const [erro, setErro]                   = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'diretor') { navigate('/'); return }
      setDiretor(dados)
      try {
        const lista = await getTurmas()
        setTurmas(lista)
      } catch {
        setErro('Erro ao carregar turmas. Tente recarregar a página.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [navigate])

  if (!diretor) return null

  const turmasFiltradas = filtro === 'todos'
    ? turmas
    : turmas.filter(t => t.turno === filtro)

  async function handleRemover(id) {
    try {
      await removerTurma(id)
      setTurmas(prev => prev.filter(t => t.id !== id))
      setConfirmandoId(null)
    } catch {
      setErro('Erro ao remover turma. Tente novamente.')
      setConfirmandoId(null)
    }
  }

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={diretor.nome}
        cargo={`Diretor · ${diretor.escola || 'Minha Escola'}`}
        avatarCor={avatarCores.diretor}
        avatarLetras={getIniciais(diretor.nome)}
      />

      <div className={dashStyles.corpo}>
        <div className={styles.cabecalho}>
          <div>
            <button className={styles.btnVoltar} onClick={() => navigate('/dashboard/diretor')}>
              ← Painel
            </button>
            <h1 className={styles.titulo}>Gerenciar Turmas</h1>
          </div>
          <button className={styles.btnNovo} onClick={() => navigate('/gerenciar-turmas/novo')}>
            + Nova turma
          </button>
        </div>

        <div className={styles.filtros}>
          {['todos', 'manha', 'tarde', 'noite'].map(f => (
            <button
              key={f}
              className={`${styles.filtroBtn} ${filtro === f ? styles.filtroBtnAtivo : ''}`}
              onClick={() => { setFiltro(f); setConfirmandoId(null) }}
            >
              {f === 'todos' ? 'Todos' : labelTurno[f]}
              <span className={styles.filtroCount}>
                {f === 'todos' ? turmas.length : turmas.filter(t => t.turno === f).length}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.lista}>
          {erro       && <p className={styles.erro}>{erro}</p>}
          {carregando && <p className={styles.vazio}>Carregando turmas...</p>}
          {!carregando && !erro && turmasFiltradas.length === 0 && (
            <p className={styles.vazio}>Nenhuma turma cadastrada.</p>
          )}

          {turmasFiltradas.map(t => (
            <div key={t.id} className={styles.usuarioCard}>
              <div
                className={styles.usuarioAvatar}
                style={{ background: corTurno[t.turno] ?? avatarCores.diretor }}
              >
                {getIniciais(t.nome)}
              </div>

              <div className={styles.usuarioInfo}>
                <p className={styles.usuarioNome}>{t.nome}</p>
                <p className={styles.usuarioEmail}>
                  Ano letivo {t.ano_letivo} · {t.total_alunos ?? 0} alunos
                </p>
              </div>

              <span className={`${styles.perfilBadge} ${styles[`badge_${t.turno}`]}`}>
                {labelTurno[t.turno] ?? t.turno}
              </span>

              <div className={styles.acoes}>
                {confirmandoId === t.id ? (
                  <>
                    <span className={styles.confirmarTexto}>Remover?</span>
                    <button className={styles.btnConfirmar} onClick={() => handleRemover(t.id)}>Sim</button>
                    <button className={styles.btnCancelarAcao} onClick={() => setConfirmandoId(null)}>Não</button>
                  </>
                ) : (
                  <>
                    <button
                      className={styles.btnEditar}
                      onClick={() => navigate(`/gerenciar-turmas/${t.id}`)}
                    >
                      Alunos
                    </button>
                    <button
                      className={styles.btnEditar}
                      onClick={() => navigate(`/gerenciar-turmas/editar/${t.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.btnRemover}
                      onClick={() => setConfirmandoId(t.id)}
                    >
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
