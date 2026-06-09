import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getMinhasTurmas, getAlunosDaTurma } from '../services/turmaService'
import { getAtividades } from '../services/atividadeService'
import { getNotasDoAluno, atualizarNota } from '../services/notaService'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

export default function EntregasAtividadePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [professor, setProfessor]     = useState(null)
  const [atividade, setAtividade]     = useState(null)
  const [alunos, setAlunos]           = useState([])
  const [entregasMap, setEntregasMap] = useState({})
  const [notasInput, setNotasInput]   = useState({})
  const [salvandoId, setSalvandoId]   = useState(null)
  const [carregando, setCarregando]   = useState(true)
  const [erro, setErro]               = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
      setProfessor(dados)

      try {
        const [turmas, todasAtividades] = await Promise.all([
          getMinhasTurmas(),
          getAtividades(),
        ])

        const atv = todasAtividades.find(a => a.id === id)
        if (!atv) { navigate('/professor/atividades'); return }
        setAtividade(atv)

        const turma = turmas.find(t => t.id === atv.turma_id)
        if (!turma) { setCarregando(false); return }

        const alunosDaTurma = await getAlunosDaTurma(turma.id)
        setAlunos(alunosDaTurma)

        const todasEntregas = await Promise.all(
          alunosDaTurma.map(a => getNotasDoAluno(a.id))
        )

        const mapa = {}
        const inputInicial = {}
        alunosDaTurma.forEach((aluno, idx) => {
          const entrega = todasEntregas[idx].find(e => e.atividade_id === id)
          if (entrega) {
            mapa[aluno.id] = entrega
            inputInicial[aluno.id] = entrega.nota !== null && entrega.nota !== undefined
              ? String(entrega.nota)
              : ''
          }
        })
        setEntregasMap(mapa)
        setNotasInput(inputInicial)
      } catch {
        setErro('Erro ao carregar dados das entregas.')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [id, navigate])

  async function handleSalvarNota(alunoId) {
    const entrega = entregasMap[alunoId]
    if (!entrega) return
    const valor = parseFloat(notasInput[alunoId])
    if (isNaN(valor) || valor < 0 || valor > 10) {
      setErro('Nota deve ser um número entre 0 e 10.')
      return
    }
    setSalvandoId(alunoId)
    setErro('')
    try {
      await atualizarNota(entrega.id, valor)
      setEntregasMap(prev => ({ ...prev, [alunoId]: { ...entrega, nota: valor } }))
    } catch {
      setErro('Erro ao salvar nota.')
    } finally {
      setSalvandoId(null)
    }
  }

  if (!professor || (!atividade && !carregando)) return null

  const entregaram    = alunos.filter(a =>  entregasMap[a.id])
  const naoEntregaram = alunos.filter(a => !entregasMap[a.id])

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={professor.nome}
        cargo={`Professor · ${professor.disciplina || 'Sem disciplina'}`}
        avatarCor={avatarCores.professor}
        avatarLetras={getIniciais(professor.nome)}
      />

      <div className={dashStyles.corpo}>
        <div className={styles.cabecalho}>
          <div>
            <button className={styles.btnVoltar} onClick={() => navigate('/professor/atividades')}>
              ← Atividades
            </button>
            <h1 className={styles.titulo}>
              {atividade?.titulo ?? '...'}
              {!carregando && (
                <span style={{ fontWeight: 400, fontSize: 14, color: 'var(--cinza-texto)', marginLeft: 8 }}>
                  · {entregaram.length}/{alunos.length} entregas
                </span>
              )}
            </h1>
          </div>
        </div>

        {erro      && <p className={styles.erro}>{erro}</p>}
        {carregando && <p className={styles.vazio}>Carregando entregas...</p>}

        {!carregando && (
          <>
            {entregaram.length > 0 && (
              <>
                <p className={dashStyles.secaoTitulo}>Entregaram ({entregaram.length})</p>
                <div className={styles.lista}>
                  {entregaram.map(a => {
                    const entrega  = entregasMap[a.id]
                    const notaSalva = entrega.nota !== null && entrega.nota !== undefined
                    return (
                      <div key={a.id} className={styles.usuarioCard}>
                        <div className={styles.usuarioAvatar} style={{ background: avatarCores.aluno }}>
                          {getIniciais(a.nome)}
                        </div>

                        <div className={styles.usuarioInfo}>
                          <p className={styles.usuarioNome}>{a.nome}</p>
                          <p className={styles.usuarioEmail}>
                            {a.matricula ? `Matrícula: ${a.matricula}` : a.email}
                          </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                          {notaSalva && (
                            <span style={{ fontSize: 12, color: 'var(--cinza-texto)' }}>
                              Nota atual: <strong style={{ color: 'var(--verde)' }}>{entrega.nota}</strong>
                            </span>
                          )}
                          <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            placeholder="0–10"
                            value={notasInput[a.id] ?? ''}
                            onChange={e => {
                              setNotasInput(prev => ({ ...prev, [a.id]: e.target.value }))
                              setErro('')
                            }}
                            style={{
                              width: 68,
                              height: 36,
                              border: '1.5px solid var(--cinza-borda)',
                              borderRadius: 8,
                              padding: '0 10px',
                              fontSize: 14,
                              fontFamily: 'var(--fonte-corpo)',
                              textAlign: 'center',
                              outline: 'none',
                            }}
                          />
                          <button
                            className={styles.btnEditar}
                            onClick={() => handleSalvarNota(a.id)}
                            disabled={salvandoId === a.id || !notasInput[a.id]}
                          >
                            {salvandoId === a.id ? '...' : notaSalva ? 'Atualizar' : 'Lançar'}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {naoEntregaram.length > 0 && (
              <>
                <p className={dashStyles.secaoTitulo} style={{ marginTop: 24 }}>
                  Não entregaram ({naoEntregaram.length})
                </p>
                <div className={styles.lista}>
                  {naoEntregaram.map(a => (
                    <div key={a.id} className={styles.usuarioCard}>
                      <div className={styles.usuarioAvatar} style={{ background: '#94a3b8' }}>
                        {getIniciais(a.nome)}
                      </div>
                      <div className={styles.usuarioInfo}>
                        <p className={styles.usuarioNome}>{a.nome}</p>
                        <p className={styles.usuarioEmail}>
                          {a.matricula ? `Matrícula: ${a.matricula}` : a.email}
                        </p>
                      </div>
                      <span className={styles.perfilBadge} style={{ background: '#f1f5f9', color: '#64748b' }}>
                        Não entregou
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {alunos.length === 0 && (
              <p className={styles.vazio}>Nenhum aluno nesta turma.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
