import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getUsuarios, getIniciais, avatarCores } from '../utils/usuario'
import { getTurmaPorId, atualizarTurma } from '../services/turmaService'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

export default function EditarTurmaPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const [diretor, setDiretor]       = useState(null)
  const [professores, setProfessores] = useState([])
  const [campos, setCampos]         = useState({ nome: '', turno: '', ano_letivo: '', professor_id: '' })
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro]             = useState('')
  const [sucesso, setSucesso]       = useState(false)
  const [salvando, setSalvando]     = useState(false)

  useEffect(() => {
    async function carregar() {
      const dadosDiretor = getUsuario()
      if (!dadosDiretor || dadosDiretor.perfil !== 'diretor') { navigate('/'); return }
      setDiretor(dadosDiretor)

      try {
        const [turma, usuarios] = await Promise.all([getTurmaPorId(id), getUsuarios()])
        if (turma) setCampos({
          nome:         turma.nome,
          turno:        turma.turno,
          ano_letivo:   turma.ano_letivo,
          professor_id: turma.professor_id || '',
        })
        setProfessores(usuarios.filter(u => u.perfil === 'professor'))
      } catch {
        navigate('/gerenciar-turmas')
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [id, navigate])

  if (!diretor || carregando) return null

  function atualizarCampo(campo, valor) {
    setCampos(prev => ({ ...prev, [campo]: valor }))
    setErro('')
  }

  async function handleSalvar(e) {
    e.preventDefault()

    if (!campos.nome.trim())       { setErro('Informe o nome da turma.'); return }
    if (!campos.turno)              { setErro('Selecione o turno.'); return }
    if (!campos.ano_letivo.trim()) { setErro('Informe o ano letivo.'); return }

    setSalvando(true)
    try {
      await atualizarTurma(id, campos)
      setSucesso(true)
      setTimeout(() => navigate('/gerenciar-turmas'), 1200)
    } catch (e) {
      setErro(e.message || 'Erro ao salvar alterações. Tente novamente.')
    } finally {
      setSalvando(false)
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
              ← Gerenciar turmas
            </button>
            <h1 className={styles.titulo}>Editar Turma</h1>
          </div>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSalvar} noValidate>
            <div className={styles.campo}>
              <label className={styles.label}>Nome da turma</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Ex: 9º Ano A"
                value={campos.nome}
                onChange={e => atualizarCampo('nome', e.target.value)}
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Turno</label>
              <select
                className={styles.select}
                value={campos.turno}
                onChange={e => atualizarCampo('turno', e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="manha">Manhã</option>
                <option value="tarde">Tarde</option>
                <option value="noite">Noite</option>
              </select>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Ano letivo</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Ex: 2026"
                value={campos.ano_letivo}
                onChange={e => atualizarCampo('ano_letivo', e.target.value)}
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Professor responsável (opcional)</label>
              <select
                className={styles.select}
                value={campos.professor_id}
                onChange={e => atualizarCampo('professor_id', e.target.value)}
              >
                <option value="">Sem professor atribuído</option>
                {professores.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nome}{p.disciplina ? ` · ${p.disciplina}` : ''}
                  </option>
                ))}
              </select>
            </div>

            {erro    && <p className={styles.erro}>{erro}</p>}
            {sucesso && <p className={styles.sucesso}>Alterações salvas com sucesso!</p>}

            <div className={styles.botoesForm}>
              <button type="submit" className={styles.btnSalvar} disabled={salvando}>
                {salvando ? 'Salvando...' : 'Salvar alterações'}
              </button>
              <button type="button" className={styles.btnCancelar} onClick={() => navigate('/gerenciar-turmas')}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
