import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getMinhasTurmas, getAlunosDaTurma } from '../services/turmaService'
import { getAtividades } from '../services/atividadeService'
import { getNotasPorAtividade, lancarNota, atualizarNota } from '../services/notaService'
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

        const [alunosDaTurma, entregasDaAtividade] = await Promise.all([
          getAlunosDaTurma(turma.id),
          getNotasPorAtividade(id),
        ])

        setAlunos(alunosDaTurma)

        const mapa = {}
        const inputInicial = {}
        entregasDaAtividade.forEach(e => {
          mapa[e.aluno_id] = e
          inputInicial[e.aluno_id] = e.nota !== null && e.nota !== undefined
            ? String(e.nota)
            : ''
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
    const valor = parseFloat(notasInput[alunoId])
    if (isNaN(valor) || valor < 0 || valor > 10) {
      setErro('Nota deve ser um número entre 0 e 10.')
      return
    }
    setSalvandoId(alunoId)
    setErro('')
    try {
      const entrega = entregasMap[alunoId]
      let resultado
      if (entrega) {
        resultado = await atualizarNota(entrega.id, valor)
      } else {
        resultado = await lancarNota({
          atividade_id: id,
          aluno_id: alunoId,
          nota: valor,
          data_entrega: new Date().toISOString(),
        })
      }
      setEntregasMap(prev => ({ ...prev, [alunoId]: { ...resultado, nota: valor } }))
      setNotasInput(prev => ({ ...prev, [alunoId]: String(valor) }))
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

        {erro       && <p className={styles.erro}>{erro}</p>}
        {carregando && <p className={styles.vazio}>Carregando entregas...</p>}

        {!carregando && (
          <>
            {entregaram.length > 0 && (
              <>
                <p className={dashStyles.secaoTitulo}>Entregaram ({entregaram.length})</p>
                <div className={styles.lista}>
                  {entregaram.map(a => (
                    <AlunoNotaCard
                      key={a.id}
                      aluno={a}
                      entrega={entregasMap[a.id]}
                      notaInput={notasInput[a.id] ?? ''}
                      onChangeNota={val => {
                        setNotasInput(prev => ({ ...prev, [a.id]: val }))
                        setErro('')
                      }}
                      onSalvar={() => handleSalvarNota(a.id)}
                      salvando={salvandoId === a.id}
                    />
                  ))}
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
                    <AlunoNotaCard
                      key={a.id}
                      aluno={a}
                      entrega={null}
                      notaInput={notasInput[a.id] ?? ''}
                      onChangeNota={val => {
                        setNotasInput(prev => ({ ...prev, [a.id]: val }))
                        setErro('')
                      }}
                      onSalvar={() => handleSalvarNota(a.id)}
                      salvando={salvandoId === a.id}
                    />
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

function AlunoNotaCard({ aluno, entrega, notaInput, onChangeNota, onSalvar, salvando }) {
  const notaSalva = entrega && entrega.nota !== null && entrega.nota !== undefined

  return (
    <div className={styles.usuarioCard}>
      <div
        className={styles.usuarioAvatar}
        style={{ background: entrega ? avatarCores.aluno : '#94a3b8' }}
      >
        {getIniciais(aluno.nome)}
      </div>

      <div className={styles.usuarioInfo}>
        <p className={styles.usuarioNome}>{aluno.nome}</p>
        <p className={styles.usuarioEmail}>
          {aluno.matricula ? `Matrícula: ${aluno.matricula}` : aluno.email}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {notaSalva && (
          <span style={{ fontSize: 12, color: 'var(--cinza-texto)' }}>
            Atual: <strong style={{ color: Number(entrega.nota) >= 6 ? 'var(--verde)' : '#dc2626' }}>
              {entrega.nota}
            </strong>
          </span>
        )}
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          placeholder="0–10"
          value={notaInput}
          onChange={e => onChangeNota(e.target.value)}
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
          onClick={onSalvar}
          disabled={salvando || notaInput === ''}
        >
          {salvando ? '...' : notaSalva ? 'Atualizar' : 'Lançar'}
        </button>
      </div>
    </div>
  )
}
