import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getTurmaPorId, getAlunosDaTurma } from '../services/turmaService'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

const labelTurno = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite' }

export default function AlunosDaTurmaPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [professor, setProfessor]         = useState(null)
  const [turma, setTurma]                 = useState(null)
  const [alunos, setAlunos]               = useState([])
  const [carregando, setCarregando]       = useState(true)
  const [erro, setErro]                   = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
      setProfessor(dados)
      try {
        const [dadosTurma, listaAlunos] = await Promise.all([
          getTurmaPorId(id),
          getAlunosDaTurma(id),
        ])
        setTurma(dadosTurma)
        setAlunos(listaAlunos)
      } catch {
        setErro('Erro ao carregar alunos da turma.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [id, navigate])

  if (!professor || carregando) return null

  const disciplina = professor.disciplina || 'Sem disciplina'

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={professor.nome}
        cargo={`Professor · ${disciplina}`}
        avatarCor={avatarCores.professor}
        avatarLetras={getIniciais(professor.nome)}
      />

      <div className={dashStyles.corpo}>
        <div className={styles.cabecalho}>
          <div>
            <button className={styles.btnVoltar} onClick={() => navigate('/professor/turmas')}>
              ← Minhas turmas
            </button>
            <h1 className={styles.titulo}>
              {turma?.nome}
              <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)', marginLeft: 8 }}>
                · {labelTurno[turma?.turno] ?? turma?.turno} · {turma?.ano_letivo}
              </span>
            </h1>
          </div>
        </div>

        {erro && <p className={styles.erro}>{erro}</p>}

        <p className={dashStyles.secaoTitulo}>
          Alunos ({alunos.length})
        </p>

        <div className={styles.lista}>
          {alunos.length === 0 && (
            <p className={styles.vazio}>Nenhum aluno nesta turma ainda.</p>
          )}

          {alunos.map(a => (
            <div key={a.id} className={styles.usuarioCard}>
              <div className={styles.usuarioAvatar} style={{ background: avatarCores.aluno }}>
                {getIniciais(a.nome)}
              </div>

              <div className={styles.usuarioInfo}>
                <p className={styles.usuarioNome}>{a.nome}</p>
                <p className={styles.usuarioEmail}>
                  {a.email}{a.matricula ? ` · Matrícula ${a.matricula}` : ''}
                </p>
              </div>

              <span className={`${styles.perfilBadge} ${styles.badge_aluno}`}>Aluno</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
