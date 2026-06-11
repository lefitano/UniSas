import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import TabNav from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getConteudosPorTurma } from '../services/conteudoService'
import { BsFilePdf, BsCalendar, BsPeopleFill } from 'react-icons/bs'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

const ABAS_ALUNO = [
  { label: 'Início',      rota: '/dashboard/aluno'  },
  { label: 'Atividades',  rota: '/aluno/atividades' },
  { label: 'Minhas aulas', rota: '/aluno/aulas'     },
  'Chat',
]

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR')
}

export default function MinhasAulasPage() {
  const navigate = useNavigate()
  const [aluno, setAluno]         = useState(null)
  const [aulas, setAulas]         = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro]           = useState('')

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
        const lista = await getConteudosPorTurma(dados.turma_id)
        setAulas(lista)
      } catch {
        setErro('Erro ao carregar aulas.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [navigate])

  if (!aluno) return null

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={aluno.nome}
        cargo="Aluno"
        avatarCor={avatarCores.aluno}
        avatarLetras={getIniciais(aluno.nome)}
      />

      <TabNav abas={ABAS_ALUNO} />

      <div className={dashStyles.corpo}>
        <div className={styles.cabecalho}>
          <h1 className={styles.titulo}>
            Minhas Aulas
            {!carregando && (
              <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)', marginLeft: 8 }}>
                ({aulas.length})
              </span>
            )}
          </h1>
        </div>

        {!aluno.turma_id && (
          <p className={styles.vazio}>Você ainda não está vinculado a nenhuma turma.</p>
        )}

        {erro       && <p className={styles.erro}>{erro}</p>}
        {carregando && <p className={styles.vazio}>Carregando aulas...</p>}

        {!carregando && aluno.turma_id && aulas.length === 0 && (
          <p className={styles.vazio}>Nenhuma aula publicada ainda.</p>
        )}

        {!carregando && aulas.length > 0 && (
          <div className={styles.lista}>
            {aulas.map(a => (
              <div key={a.id} className={styles.usuarioCard}>
                <div className={styles.usuarioAvatar} style={{ background: '#6366f1' }}>
                  <BsFilePdf size={18} color="#fff" />
                </div>

                <div className={styles.usuarioInfo}>
                  <p className={styles.usuarioNome}>{a.titulo}</p>
                  {a.descricao && (
                    <p className={styles.usuarioEmail}>{a.descricao}</p>
                  )}
                  <p style={{ fontSize: 11, color: 'var(--cinza-texto)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <BsCalendar size={10} /> {formatarData(a.created_at)}
                    </span>
                    {a.turmas?.nome ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <BsPeopleFill size={10} /> {a.turmas.nome}
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <BsPeopleFill size={10} /> Todas as turmas
                      </span>
                    )}
                  </p>
                </div>

                <a
                  href={a.arquivo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--verde)',
                    textDecoration: 'none',
                    flexShrink: 0,
                    padding: '6px 12px',
                    border: '1.5px solid var(--verde)',
                    borderRadius: 8,
                  }}
                >
                  <BsFilePdf size={13} /> Abrir PDF
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
