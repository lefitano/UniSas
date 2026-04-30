import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { salvarUsuario, adicionarUsuario, getUsuarios } from '../utils/usuario'
import LoginForm from '../components/auth/LoginForm'
import styles from './AuthPage.module.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const perfilConfig = {
  aluno: {
    label: 'Aluno',
    icon: '📚',
    camposCadastro: [
      { id: 'nome',          label: 'Nome completo',        type: 'text',     placeholder: 'Ex: Ana Souza' },
      { id: 'email',         label: 'Email institucional',  type: 'email',    placeholder: 'aluno@escola.edu.br' },
      { id: 'matricula',     label: 'Número de matrícula',  type: 'text',     placeholder: 'Ex: 2024001234' },
      { id: 'senha',         label: 'Senha',                type: 'password', placeholder: 'Mínimo 8 caracteres' },
      { id: 'confirmarSenha',label: 'Confirmar senha',      type: 'password', placeholder: 'Repita a senha' },
    ],
  },
  professor: {
    label: 'Professor',
    icon: '🎓',
    camposCadastro: [
      { id: 'nome',              label: 'Nome completo',        type: 'text',     placeholder: 'Ex: Carlos Lima' },
      { id: 'email',             label: 'Email institucional',  type: 'email',    placeholder: 'professor@escola.edu.br' },
      { id: 'registroFuncional', label: 'Registro Funcional',   type: 'text',     placeholder: 'Ex: 1234567' },
      { id: 'disciplina',        label: 'Disciplina principal', type: 'select',   options: ['Matemática','Português','Ciências','História','Geografia','Física','Química','Biologia','Inglês','Artes','Educação Física'] },
      { id: 'senha',             label: 'Senha',                type: 'password', placeholder: 'Mínimo 8 caracteres' },
      { id: 'confirmarSenha',    label: 'Confirmar senha',      type: 'password', placeholder: 'Repita a senha' },
    ],
  },
  responsavel: {
    label: 'Responsável',
    icon: '👨‍👧',
    camposCadastro: [
      { id: 'nome',          label: 'Nome completo',                type: 'text',     placeholder: 'Ex: Maria Souza' },
      { id: 'email',         label: 'Email',                        type: 'email',    placeholder: 'seu@email.com' },
      { id: 'cpf',           label: 'CPF',                          type: 'text',     placeholder: '000.000.000-00' },
      { id: 'codigoAluno',   label: 'Matrícula do aluno vinculado', type: 'text',     placeholder: 'Ex: 2024001234' },
      { id: 'senha',         label: 'Senha',                        type: 'password', placeholder: 'Mínimo 8 caracteres' },
      { id: 'confirmarSenha',label: 'Confirmar senha',              type: 'password', placeholder: 'Repita a senha' },
    ],
  },
  diretor: {
    label: 'Diretor',
    icon: '🏫',
    camposCadastro: [
      { id: 'nome',          label: 'Nome completo',       type: 'text',     placeholder: 'Ex: Sandra Oliveira' },
      { id: 'email',         label: 'Email institucional', type: 'email',    placeholder: 'diretor@escola.edu.br' },
      { id: 'cpf',           label: 'CPF',                 type: 'text',     placeholder: '000.000.000-00' },
      { id: 'escola',        label: 'Nome da escola',      type: 'text',     placeholder: 'Ex: E.E. João XXIII' },
      { id: 'senha',         label: 'Senha',               type: 'password', placeholder: 'Mínimo 8 caracteres' },
      { id: 'confirmarSenha',label: 'Confirmar senha',     type: 'password', placeholder: 'Repita a senha' },
    ],
  },
}

export default function AuthPage() {
  const { perfil } = useParams()
  const navigate    = useNavigate()
  const config      = perfilConfig[perfil]

  const [aba,          setAba]          = useState('cadastro')
  const [campos,       setCampos]       = useState({})
  const [erro,         setErro]         = useState('')
  const [erroLogin,    setErroLogin]    = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  if (!config) {
    navigate('/')
    return null
  }

  function atualizarCampo(id, valor) {
    setCampos(prev => ({ ...prev, [id]: valor }))
    setErro('')
  }

  function trocarAba(novaAba) {
    setAba(novaAba)
    setCampos({})
    setErro('')
    setErroLogin('')
    setMostrarSenha(false)
  }

  function handleEntrar({ email, senha }) {
    setErroLogin('')
    const usuarios = getUsuarios()
    const usuario  = usuarios.find(
      u => u.email === email && u.senha === senha && u.perfil === perfil
    )
    if (!usuario) {
      setErroLogin('Email ou senha incorretos.')
      return
    }
    salvarUsuario({
      nome:              usuario.nome,
      email:             usuario.email,
      perfil:            usuario.perfil,
      matricula:         usuario.matricula         || null,
      registroFuncional: usuario.registroFuncional || null,
      disciplina:        usuario.disciplina        || null,
      cpf:               usuario.cpf               || null,
      escola:            usuario.escola            || null,
      codigoAluno:       usuario.codigoAluno       || null,
    })
    navigate(`/dashboard/${perfil}`)
  }

  function handleCadastrar(e) {
    e.preventDefault()
    for (const campo of config.camposCadastro) {
      if (!campos[campo.id]) {
        setErro('Preencha todos os campos obrigatórios.')
        return
      }
    }
    if (!emailRegex.test(campos.email)) {
      setErro('Informe um e-mail válido.')
      return
    }
    if (campos.senha.length < 8) {
      setErro('A senha deve ter no mínimo 8 caracteres.')
      return
    }
    if (campos.senha !== campos.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }
    const jaExiste = getUsuarios().find(u => u.email === campos.email)
    if (jaExiste) {
      setErro('Já existe uma conta com esse e-mail.')
      return
    }
    const dadosUsuario = {
      nome:              campos.nome,
      email:             campos.email,
      senha:             campos.senha,
      perfil,
      matricula:         campos.matricula         || null,
      registroFuncional: campos.registroFuncional || null,
      disciplina:        campos.disciplina        || null,
      cpf:               campos.cpf               || null,
      escola:            campos.escola            || null,
      codigoAluno:       campos.codigoAluno       || null,
    }
    adicionarUsuario(dadosUsuario)
    salvarUsuario(dadosUsuario)
    navigate(`/dashboard/${perfil}`)
  }

  function renderCampo(campo) {
    if (campo.type === 'select') {
      return (
        <select
          className={styles.input}
          value={campos[campo.id] || ''}
          onChange={e => atualizarCampo(campo.id, e.target.value)}
        >
          <option value="">Selecione...</option>
          {campo.options.map(op => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
      )
    }

    if (campo.type === 'password') {
      return (
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            type={mostrarSenha ? 'text' : 'password'}
            placeholder={campo.placeholder}
            value={campos[campo.id] || ''}
            onChange={e => atualizarCampo(campo.id, e.target.value)}
          />
          {campo.id === 'senha' && (
            <button
              type="button"
              className={styles.olhoBtn}
              onClick={() => setMostrarSenha(v => !v)}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? '🙈' : '👁️'}
            </button>
          )}
        </div>
      )
    }

    return (
      <input
        className={styles.input}
        type={campo.type}
        placeholder={campo.placeholder}
        value={campos[campo.id] || ''}
        onChange={e => atualizarCampo(campo.id, e.target.value)}
      />
    )
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.fundo} />

      <div className={styles.conteudo}>
        <div className={styles.marca}>
          <div className={styles.logo}>
            <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
              <rect x="4" y="10" width="28" height="20" rx="4" fill="#1a3a23"/>
              <rect x="8" y="14" width="8"  height="2" rx="1" fill="#F0C040"/>
              <rect x="8" y="18" width="12" height="2" rx="1" fill="rgba(255,255,255,0.6)"/>
              <rect x="8" y="22" width="9"  height="2" rx="1" fill="rgba(255,255,255,0.4)"/>
              <circle cx="26" cy="10" r="5" fill="#F0C040"/>
              <text x="26" y="14" textAnchor="middle" fontSize="7" fill="#1a3a23" fontWeight="700">A</text>
            </svg>
          </div>
          <span className={styles.nomeApp}>UniSAS</span>
          <span className={styles.tagline}>Sistema Acadêmico Unificado · Rede Pública</span>
        </div>

        {aba === 'entrar' ? (
          <LoginForm
            perfil={perfil}
            onVoltar={() => navigate('/')}
            onLogin={handleEntrar}
            onCadastrar={() => trocarAba('cadastro')}
            erroExterno={erroLogin}
          />
        ) : (
          <div className={styles.card}>
            <div className={styles.perfilBadge}>
              <span className={styles.perfilIcone}>{config.icon}</span>
              <span className={styles.perfilLabel}>{config.label}</span>
              <button className={styles.trocarPerfil} onClick={() => navigate('/')}>
                ← Trocar perfil
              </button>
            </div>

              <form className={styles.form} onSubmit={handleCadastrar} noValidate>
              {config.camposCadastro.map(campo => (
                <div key={campo.id} className={styles.campo}>
                  <label className={styles.label}>{campo.label}</label>
                  {renderCampo(campo)}
                </div>
              ))}

              {erro && <p className={styles.erro}>{erro}</p>}

              <button type="submit" className={styles.btnPrimario}>Criar conta</button>

              <p className={styles.linkSecundario}>
                Já tem uma conta?{' '}
                <span className={styles.link} onClick={() => trocarAba('entrar')}>
                  Faça o login
                </span>
              </p>
            </form>

            <div className={styles.rodape}>
              <span>🔒</span>
              <span>Dados protegidos pela LGPD</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
