import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import { getMinhasTurmas } from '../services/turmaService'
import { criarAtividade } from '../services/atividadeService'
import { uploadPDF } from '../services/uploadService'
import { BsFilePdf, BsXCircle } from 'react-icons/bs'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

export default function NovaAtividadePage() {
  const navigate        = useNavigate()
  const inputArquivoRef = useRef(null)

  const [professor, setProfessor] = useState(null)
  const [turmas, setTurmas]       = useState([])
  const [titulo, setTitulo]       = useState('')
  const [descricao, setDescricao] = useState('')
  const [prazo, setPrazo]         = useState('')
  const [turmaId, setTurmaId]     = useState('')
  const [arquivo, setArquivo]     = useState(null)
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

  function handleSelecionarArquivo(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setErro('Apenas arquivos PDF são permitidos.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setErro('O arquivo deve ter no máximo 5MB.')
      return
    }
    setArquivo(file)
    setErro('')
  }

  async function handleSalvar(e) {
    e.preventDefault()
    if (!titulo.trim()) { setErro('Informe o título da atividade.'); return }
    if (!prazo)         { setErro('Informe o prazo de entrega.'); return }
    if (!turmaId)       { setErro('Selecione uma turma.'); return }

    setSalvando(true)
    setErro('')

    try {
      let arquivo_url = null
      if (arquivo) {
        const resultado = await uploadPDF(arquivo)
        arquivo_url = resultado.url
      }

      await criarAtividade({
        titulo:    titulo.trim(),
        descricao: descricao.trim() || null,
        prazo,
        turma_id:  turmaId,
        arquivo_url,
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

            <div className={styles.campo}>
              <label className={styles.label}>Anexo PDF (opcional)</label>
              <input
                ref={inputArquivoRef}
                type="file"
                accept=".pdf,application/pdf"
                style={{ display: 'none' }}
                onChange={handleSelecionarArquivo}
              />
              {arquivo ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 14px',
                  background: '#f0fdf4',
                  border: '1.5px solid var(--verde)',
                  borderRadius: 10,
                }}>
                  <BsFilePdf size={18} color="var(--verde)" />
                  <span style={{ fontSize: 13, color: 'var(--texto)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {arquivo.name}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--cinza-texto)', flexShrink: 0 }}>
                    {(arquivo.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                  <button
                    type="button"
                    onClick={() => { setArquivo(null); inputArquivoRef.current.value = '' }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: 0, display: 'flex' }}
                    aria-label="Remover arquivo"
                  >
                    <BsXCircle size={17} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => inputArquivoRef.current.click()}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1.5px dashed var(--cinza-borda)',
                    borderRadius: 10,
                    background: '#fafafa',
                    cursor: 'pointer',
                    fontSize: 13,
                    color: 'var(--cinza-texto)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <BsFilePdf size={16} />
                  Selecionar PDF (máx. 5MB)
                </button>
              )}
            </div>

            {erro    && <p className={styles.erro}>{erro}</p>}
            {sucesso && <p className={styles.sucesso}>Atividade criada com sucesso!</p>}

            <div className={styles.botoesForm}>
              <button type="submit" className={styles.btnSalvar} disabled={salvando}>
                {salvando ? (arquivo ? 'Enviando PDF...' : 'Criando...') : 'Criar atividade'}
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
