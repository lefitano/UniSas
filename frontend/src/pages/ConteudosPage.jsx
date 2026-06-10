import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import TabNav from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getConteudos, removerConteudo } from '../services/conteudoService'
import { BsFilePdf, BsCalendar } from 'react-icons/bs'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

const ABAS = [
  { label: 'Início',        rota: '/dashboard/professor'  },
  { label: 'Minhas turmas', rota: '/professor/turmas'     },
  { label: 'Atividades',    rota: '/professor/atividades' },
  { label: 'Conteúdos',     rota: '/professor/conteudos'  },
  'Chat',
]

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR')
}

export default function ConteudosPage() {
  const navigate = useNavigate()
  const [professor, setProfessor]         = useState(null)
  const [conteudos, setConteudos]         = useState([])
  const [confirmandoId, setConfirmandoId] = useState(null)
  const [carregando, setCarregando]       = useState(true)
  const [erro, setErro]                   = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
      setProfessor(dados)
      try {
        const lista = await getConteudos(dados.id)
        setConteudos(lista)
      } catch {
        setErro('Erro ao carregar conteúdos.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [navigate])

  if (!professor) return null

  async function handleRemover(id) {
    try {
      await removerConteudo(id)
      setConteudos(prev => prev.filter(c => c.id !== id))
      setConfirmandoId(null)
    } catch {
      setErro('Erro ao remover conteúdo.')
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

      <TabNav abas={ABAS} />

      <div className={dashStyles.corpo}>
        <div className={styles.cabecalho}>
          <div>
            <button className={styles.btnVoltar} onClick={() => navigate('/dashboard/professor')}>
              ← Painel
            </button>
            <h1 className={styles.titulo}>
              Conteúdos
              <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)', marginLeft: 8 }}>
                ({conteudos.length})
              </span>
            </h1>
          </div>
          <button className={styles.btnNovo} onClick={() => navigate('/professor/conteudos/novo')}>
            + Upload de aula
          </button>
        </div>

        <div className={styles.lista}>
          {erro       && <p className={styles.erro}>{erro}</p>}
          {carregando && <p className={styles.vazio}>Carregando conteúdos...</p>}

          {!carregando && conteudos.length === 0 && (
            <p className={styles.vazio}>Nenhuma aula publicada ainda.</p>
          )}

          {conteudos.map(c => (
            <div key={c.id} className={styles.usuarioCard}>
              <div className={styles.usuarioAvatar} style={{ background: '#6366f1' }}>
                <BsFilePdf size={18} color="#fff" />
              </div>

              <div className={styles.usuarioInfo}>
                <p className={styles.usuarioNome}>{c.titulo}</p>
                <p className={styles.usuarioEmail}>
                  {c.turmas?.nome ?? 'Todas as turmas'}
                  {c.descricao && ` · ${c.descricao}`}
                </p>
                <p style={{ fontSize: 11, color: 'var(--cinza-texto)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <BsCalendar size={10} /> {formatarData(c.created_at)}
                </p>
              </div>

              <div className={styles.acoes}>
                <a
                  href={c.arquivo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--verde)', fontWeight: 600, textDecoration: 'none' }}
                >
                  <BsFilePdf size={13} /> Abrir
                </a>

                {confirmandoId === c.id ? (
                  <>
                    <span className={styles.confirmarTexto}>Remover?</span>
                    <button className={styles.btnConfirmar} onClick={() => handleRemover(c.id)}>Sim</button>
                    <button className={styles.btnCancelarAcao} onClick={() => setConfirmandoId(null)}>Não</button>
                  </>
                ) : (
                  <button className={styles.btnRemover} onClick={() => setConfirmandoId(c.id)}>
                    Remover
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
