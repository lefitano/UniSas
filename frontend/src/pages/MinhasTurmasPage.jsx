import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar  from '../components/ui/TopBar'
import TabNav  from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getMinhasTurmas, getAlunosDaTurma } from '../services/turmaService'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

const labelTurno = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite' }
const corTurno   = { manha: '#F97316', tarde: '#EAB308', noite: '#8B5CF6' }

export default function MinhasTurmasPage() {
  const navigate = useNavigate()
  const [professor, setProfessor]       = useState(null)
  const [turmas, setTurmas]             = useState([])
  const [contagemAlunos, setContagem]   = useState({})
  const [carregando, setCarregando]     = useState(true)
  const [erro, setErro]                 = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
      setProfessor(dados)
      try {
        const lista = await getMinhasTurmas()
        setTurmas(lista)
        const listas = await Promise.all(lista.map(t => getAlunosDaTurma(t.id)))
        const mapa = {}
        lista.forEach((t, i) => { mapa[t.id] = listas[i].length })
        setContagem(mapa)
      } catch {
        setErro('Erro ao carregar turmas. Tente recarregar a página.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [navigate])

  if (!professor) return null

  const disciplina = professor.disciplina || 'Sem disciplina'

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={professor.nome}
        cargo={`Professor · ${disciplina}`}
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
              Minhas Turmas <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)' }}>({turmas.length})</span>
            </h1>
          </div>
        </div>

        <div className={styles.lista}>
          {erro       && <p className={styles.erro}>{erro}</p>}
          {carregando && <p className={styles.vazio}>Carregando turmas...</p>}
          {!carregando && !erro && turmas.length === 0 && (
            <p className={styles.vazio}>Nenhuma turma atribuída a você ainda.</p>
          )}

          {turmas.map(t => (
            <div
              key={t.id}
              className={styles.usuarioCard}
              onClick={() => navigate(`/professor/turmas/${t.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className={styles.usuarioAvatar}
                style={{ background: corTurno[t.turno] ?? avatarCores.professor }}
              >
                {getIniciais(t.nome)}
              </div>

              <div className={styles.usuarioInfo}>
                <p className={styles.usuarioNome}>{t.nome}</p>
                <p className={styles.usuarioEmail}>
                  Ano letivo {t.ano_letivo} · {contagemAlunos[t.id] ?? 0} aluno(s)
                </p>
              </div>

              <span className={`${styles.perfilBadge} ${styles[`badge_${t.turno}`]}`}>
                {labelTurno[t.turno] ?? t.turno}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
