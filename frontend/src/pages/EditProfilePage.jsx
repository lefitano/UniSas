import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsuario, salvarUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './EditProfilePage.module.css'

const camposExtras = {
  aluno:      [{ id: 'matricula',         label: 'Número de matrícula',  placeholder: 'Ex: 2024001234' }],
  professor:  [
    { id: 'registroFuncional', label: 'Registro Funcional', placeholder: 'Ex: 1234567' },
    { id: 'disciplina',        label: 'Disciplina',          placeholder: 'Ex: Matemática' },
  ],
  responsavel:[{ id: 'cpf', label: 'CPF', placeholder: '000.000.000-00' }],
  diretor:    [
    { id: 'cpf',    label: 'CPF',             placeholder: '000.000.000-00' },
    { id: 'escola', label: 'Nome da escola',  placeholder: 'Ex: E.E. João XXIII' },
  ],
}

export default function EditProfilePage() {
  const navigate = useNavigate()
  const [usuario,  setUsuario]  = useState(null)
  const [campos,   setCampos]   = useState({})
  const [sucesso,  setSucesso]  = useState(false)
  const [erro,     setErro]     = useState('')

  useEffect(() => {
    const dados = getUsuario()
    if (!dados) { navigate('/'); return }
    setUsuario(dados)
    setCampos({
      nome:              dados.nome              || '',
      email:             dados.email             || '',
      matricula:         dados.matricula         || '',
      registroFuncional: dados.registroFuncional || '',
      disciplina:        dados.disciplina        || '',
      cpf:               dados.cpf               || '',
      escola:            dados.escola            || '',
    })
  }, [navigate])

  if (!usuario) return null

  function atualizarCampo(id, valor) {
    setCampos(prev => ({ ...prev, [id]: valor }))
    setSucesso(false)
    setErro('')
  }

  function handleSalvar(e) {
    e.preventDefault()
    if (!campos.nome.trim() || !campos.email.trim()) {
      setErro('Nome e e-mail são obrigatórios.')
      return
    }
    salvarUsuario({ ...usuario, ...campos })
    setUsuario(prev => ({ ...prev, ...campos }))
    setSucesso(true)
  }

  const extras = camposExtras[usuario.perfil] || []

  return (
    <div className={styles.pagina}>
      <div className={styles.topbar}>
        <button className={styles.btnVoltar} onClick={() => navigate(`/dashboard/${usuario.perfil}`)}>
          ← Voltar
        </button>
        <span className={styles.topbarTitulo}>Editar perfil</span>
        <div />
      </div>

      <div className={styles.conteudo}>
        <div className={styles.avatarBloco}>
          <div className={styles.avatar} style={{ background: avatarCores[usuario.perfil] }}>
            {getIniciais(campos.nome || usuario.nome)}
          </div>
          <div>
            <p className={styles.avatarNome}>{campos.nome || usuario.nome}</p>
            <p className={styles.avatarPerfil}>{usuario.perfil.charAt(0).toUpperCase() + usuario.perfil.slice(1)}</p>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.secaoTitulo}>Dados pessoais</p>

          <form className={styles.form} onSubmit={handleSalvar} noValidate>
            <div className={styles.campo}>
              <label className={styles.label}>Nome completo</label>
              <input
                className={styles.input}
                type="text"
                value={campos.nome}
                onChange={e => atualizarCampo('nome', e.target.value)}
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>E-mail</label>
              <input
                className={styles.input}
                type="email"
                value={campos.email}
                onChange={e => atualizarCampo('email', e.target.value)}
              />
            </div>

            {extras.map(campo => (
              <div key={campo.id} className={styles.campo}>
                <label className={styles.label}>{campo.label}</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={campo.placeholder}
                  value={campos[campo.id]}
                  onChange={e => atualizarCampo(campo.id, e.target.value)}
                />
              </div>
            ))}

            {erro    && <p className={styles.erro}>{erro}</p>}
            {sucesso && <p className={styles.sucesso}>✅ Perfil atualizado com sucesso!</p>}

            <button type="submit" className={styles.btnSalvar}>Salvar alterações</button>
          </form>
        </div>
      </div>
    </div>
  )
}
