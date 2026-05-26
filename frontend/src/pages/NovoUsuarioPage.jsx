import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores, adicionarUsuario } from '../utils/usuario'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const camposPorPerfil = {
  aluno: [
    { id: 'nome',      label: 'Nome completo',       type: 'text',     placeholder: 'Ex: Ana Souza' },
    { id: 'email',     label: 'Email institucional', type: 'email',    placeholder: 'aluno@escola.edu.br' },
    { id: 'matricula', label: 'Número de matrícula', type: 'text',     placeholder: 'Ex: 2024001234' },
    { id: 'senha',     label: 'Senha de acesso',     type: 'password', placeholder: 'Mínimo 6 caracteres' },
  ],
  professor: [
    { id: 'nome',              label: 'Nome completo',        type: 'text',     placeholder: 'Ex: Carlos Lima' },
    { id: 'email',             label: 'Email institucional',  type: 'email',    placeholder: 'professor@escola.edu.br' },
    { id: 'registroFuncional', label: 'Registro Funcional',   type: 'text',     placeholder: 'Ex: 1234567' },
    { id: 'disciplina',        label: 'Disciplina principal', type: 'select',
      options: ['Matemática','Português','Ciências','História','Geografia','Física','Química','Biologia','Inglês','Artes','Educação Física'] },
    { id: 'senha',             label: 'Senha de acesso',      type: 'password', placeholder: 'Mínimo 6 caracteres' },
  ],
  responsavel: [
    { id: 'nome',        label: 'Nome completo',                type: 'text',     placeholder: 'Ex: Maria Souza' },
    { id: 'email',       label: 'Email',                        type: 'email',    placeholder: 'seu@email.com' },
    { id: 'cpf',         label: 'CPF',                          type: 'text',     placeholder: '000.000.000-00' },
    { id: 'codigoAluno', label: 'Matrícula do aluno vinculado', type: 'text',     placeholder: 'Ex: 2024001234' },
    { id: 'senha',       label: 'Senha de acesso',              type: 'password', placeholder: 'Mínimo 6 caracteres' },
  ],
}

export default function NovoUsuarioPage() {
  const navigate = useNavigate()
  const [diretor, setDiretor]   = useState(null)
  const [perfil, setPerfil]     = useState('aluno')
  const [campos, setCampos]     = useState({})
  const [erro, setErro]         = useState('')
  const [sucesso, setSucesso]   = useState(false)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'diretor') { navigate('/'); return }
    setDiretor(dados)
  }, [navigate])

  if (!diretor) return null

  function atualizarCampo(id, valor) {
    setCampos(prev => ({ ...prev, [id]: valor }))
    setErro('')
  }

  function handlePerfil(novoPerfil) {
    setPerfil(novoPerfil)
    setCampos({})
    setErro('')
  }

  async function handleSalvar(e) {
    e.preventDefault()

    const campos_ = camposPorPerfil[perfil]
    for (const campo of campos_) {
      if (!campos[campo.id]) {
        setErro('Preencha todos os campos obrigatórios.')
        return
      }
    }

    if (!emailRegex.test(campos.email)) {
      setErro('Informe um e-mail válido.')
      return
    }

    if (campos.senha.length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres.')
      return
    }

    try {
      await adicionarUsuario({ ...campos, perfil })
      setSucesso(true)
      setTimeout(() => navigate('/gerenciar-usuarios'), 1200)
    } catch (erro) {
      setErro(erro.message || 'Erro ao cadastrar usuário. Tente novamente.')
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
            <button className={styles.btnVoltar} onClick={() => navigate('/gerenciar-usuarios')}>
              ← Gerenciar usuários
            </button>
            <h1 className={styles.titulo}>Novo Usuário</h1>
          </div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.campo}>
            <label className={styles.label}>Tipo de perfil</label>
            <select
              className={styles.select}
              value={perfil}
              onChange={e => handlePerfil(e.target.value)}
            >
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="responsavel">Responsável</option>
            </select>
          </div>

          <form onSubmit={handleSalvar} noValidate>
            {camposPorPerfil[perfil].map(campo => (
              <div key={campo.id} className={styles.campo}>
                <label className={styles.label}>{campo.label}</label>
                {campo.type === 'select' ? (
                  <select
                    className={styles.select}
                    value={campos[campo.id] || ''}
                    onChange={e => atualizarCampo(campo.id, e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {campo.options.map(op => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    className={styles.input}
                    type={campo.type}
                    placeholder={campo.placeholder}
                    value={campos[campo.id] || ''}
                    onChange={e => atualizarCampo(campo.id, e.target.value)}
                  />
                )}
              </div>
            ))}

            {erro    && <p className={styles.erro}>{erro}</p>}
            {sucesso && <p className={styles.sucesso}>Usuário cadastrado com sucesso!</p>}

            <div className={styles.botoesForm}>
              <button type="submit" className={styles.btnSalvar}>Cadastrar</button>
              <button type="button" className={styles.btnCancelar} onClick={() => navigate('/gerenciar-usuarios')}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
