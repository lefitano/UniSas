import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getUsuarios, getIniciais, avatarCores } from '../utils/usuario'
import { getTurmaPorId, getAlunosDaTurma, vincularAluno, desvincularAluno } from '../services/turmaService'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

const labelTurno = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite' }

export default function DetalhesTurmaPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [diretor, setDiretor]               = useState(null)
  const [turma, setTurma]                   = useState(null)
  const [alunosNaTurma, setAlunosNaTurma]   = useState([])
  const [disponiveis, setDisponiveis]       = useState([])
  const [selecionado, setSelecionado]       = useState('')
  const [confirmandoId, setConfirmandoId]   = useState(null)
  const [erro, setErro]                     = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'diretor') { navigate('/'); return }
      setDiretor(dados)
      try {
        const [dadosTurma, alunosDaTurma, todosUsuarios] = await Promise.all([
          getTurmaPorId(id),
          getAlunosDaTurma(id),
          getUsuarios(),
        ])
        setTurma(dadosTurma)
        setAlunosNaTurma(alunosDaTurma)
        const semTurma = todosUsuarios.filter(u => u.perfil === 'aluno' && !u.turma_id)
        setDisponiveis(semTurma)
      } catch {
        setErro('Erro ao carregar dados da turma.')
      }
    }
    carregar()
  }, [id, navigate])

  if (!diretor || !turma) return null

  async function handleAdicionar() {
    if (!selecionado) return
    try {
      await vincularAluno(id, selecionado)
      const aluno = disponiveis.find(a => a.id === selecionado)
      setAlunosNaTurma(prev => [...prev, aluno])
      setDisponiveis(prev => prev.filter(a => a.id !== selecionado))
      setSelecionado('')
    } catch {
      setErro('Erro ao adicionar aluno à turma.')
    }
  }

  async function handleRemover(alunoId) {
    try {
      await desvincularAluno(id, alunoId)
      const aluno = alunosNaTurma.find(a => a.id === alunoId)
      setAlunosNaTurma(prev => prev.filter(a => a.id !== alunoId))
      setDisponiveis(prev => [...prev, { ...aluno, turma_id: null }])
      setConfirmandoId(null)
    } catch {
      setErro('Erro ao remover aluno da turma.')
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
            <button className={styles.btnVoltar} onClick={() => navigate('/gerenciar-turmas')}>
              ← Turmas
            </button>
            <h1 className={styles.titulo}>
              {turma.nome}
              <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)', marginLeft: 8 }}>
                · {labelTurno[turma.turno] ?? turma.turno} · {turma.ano_letivo}
              </span>
            </h1>
          </div>
        </div>

        {erro && <p className={styles.erro}>{erro}</p>}

        {disponiveis.length > 0 && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <select
              className={styles.select}
              value={selecionado}
              onChange={e => setSelecionado(e.target.value)}
              style={{ flex: 1, maxWidth: 340 }}
            >
              <option value="">Selecionar aluno para adicionar...</option>
              {disponiveis.map(a => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
            <button
              className={styles.btnNovo}
              onClick={handleAdicionar}
              disabled={!selecionado}
            >
              + Adicionar
            </button>
          </div>
        )}

        <p className={dashStyles.secaoTitulo}>
          Alunos na turma ({alunosNaTurma.length})
        </p>

        <div className={styles.lista}>
          {alunosNaTurma.length === 0 && (
            <p className={styles.vazio}>Nenhum aluno nesta turma ainda.</p>
          )}

          {alunosNaTurma.map(a => (
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

              <div className={styles.acoes}>
                {confirmandoId === a.id ? (
                  <>
                    <span className={styles.confirmarTexto}>Remover?</span>
                    <button className={styles.btnConfirmar} onClick={() => handleRemover(a.id)}>Sim</button>
                    <button className={styles.btnCancelarAcao} onClick={() => setConfirmandoId(null)}>Não</button>
                  </>
                ) : (
                  <button className={styles.btnRemover} onClick={() => setConfirmandoId(a.id)}>
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
