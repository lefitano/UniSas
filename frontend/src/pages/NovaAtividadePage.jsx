import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getMinhasTurmas } from '../services/turmaService'
import { criarAtividade } from '../services/atividadeService'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

export default function NovaAtividadePage() {
  const navigate = useNavigate()
  const [professor, setProfessor] = useState(null)
  const [turmas, setTurmas]       = useState([])
  const [titulo, setTitulo]       = useState('')
  const [descricao, setDescricao] = useState('')
  const [prazo, setPrazo]         = useState('')
  const [turmaId, setTurmaId]     = useState('')
  const [erro, setErro]           = useState('')
  const [sucesso, setSucesso]     = useState(false)
  const [salvando, setSalvando]   = useState(false)

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
      setProfessor(dados)
      try {
        const lista = await getMinhasTurmas()
        setTurmas(lista)
        if (lista.length === 1) setTurmaId(lista[0].id)
      } catch {
        setErro('Erro ao carregar turmas.')
      }
    }
    carregar()
  }, [navigate])

  if (!professor) return null

  async function handleSalvar(e) {
    e.preventDefault()
    if (!titulo.trim()) { setErro('Informe o título da atividade.'); return }
    if (!prazo)         { setErro('Informe o prazo de entrega.'); return }
    if (!turmaId)       { setErro('Selecione uma turma.'); return }

    setSalvando(true)
    setErro('')
    try {
      await criarAtividade({
        titulo:       titulo.trim(),
        descricao:    descricao.trim() || null,
        prazo,
        turma_id:     turmaId,
        professor_id: professor.id,
      })
      setSucesso(true)
      setTimeout(() => navigate('/professor/atividades'), 1200)
    } catch (e) {
      setErro(e.message || 'Erro ao criar atividade. Tente novamente.')
      setSalvando(false)
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

      <div className={dashStyles.corpo}>
        <div className={styles.cabecalho}>
          <div>
            <button className={styles.btnVoltar} onClick={() => navigate('/professor/atividades')}>
              ← Atividades
            </button>
            <h1 className={styles.titulo}>Nova Atividade</h1>
          </div>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSalvar} noValidate>
            <div className={styles.campo}>
              <label className={styles.label}>Turma *</label>
              <select
                className={styles.select}
                value={turmaId}
                onChange={e => { setTurmaId(e.target.value); setErro('') }}
                disabled={turmas.length === 0}
              >
                <option value="">Selecione a turma...</option>
                {turmas.map(t => (
                  <option key={t.id} value={t.id}>{t.nome}</option>
                ))}
              </select>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Título *</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Ex: Lista de exercícios — Cap. 3"
                value={titulo}
                onChange={e => { setTitulo(e.target.value); setErro('') }}
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Descrição (opcional)</label>
              <textarea
                className={styles.textarea}
                placeholder="Instruções, observações ou detalhes da atividade..."
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                rows={4}
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Prazo de entrega *</label>
              <input
                className={styles.input}
                type="date"
                value={prazo}
                onChange={e => { setPrazo(e.target.value); setErro('') }}
              />
            </div>

            {erro    && <p className={styles.erro}>{erro}</p>}
            {sucesso && <p className={styles.sucesso}>Atividade criada com sucesso!</p>}

            <div className={styles.botoesForm}>
              <button type="submit" className={styles.btnSalvar} disabled={salvando}>
                {salvando ? 'Criando...' : 'Criar atividade'}
              </button>
              <button
                type="button"
                className={styles.btnCancelar}
                onClick={() => navigate('/professor/atividades')}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
