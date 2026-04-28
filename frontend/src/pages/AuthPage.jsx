import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { salvarUsuario } from '../utils/usuario'
import styles from './AuthPage.module.css'

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

  const [aba,          setAba]          = useState('entrar')
  const [campos,       setCampos]       = useState({})
  const [erro,         setErro]         = useState('')
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
    setMostrarSenha(false)
  }

  function handleEntrar(e) {
    e.preventDefault()
    if (!campos.email || !campos.senha) {
      setErro('Preencha e-mail e senha para continuar.')
      return
    }
    // Salva dados básicos — o backend retornará o nome real futuramente
    const prefixo = campos.email.split('@')[0]
    const nomeTemp = prefixo.replace(/[._]/g, ' ')
      .split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
    salvarUsuario({ nome: nomeTemp, email: campos.email, perfil })
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
    if (campos.senha.length < 8) {
      setErro('A senha deve ter no mínimo 8 caracteres.')
      return
    }
    if (campos.senha !== campos.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }
    // Salva todos os dados do cadastro no localStorage
    salvarUsuario({
      nome:              campos.nome,
      email:             campos.email,
      perfil,
      matricula:         campos.matricula         || null,
      registroFuncional: campos.registroFuncional || null,
      disciplina:        campos.disciplina        || null,
      cpf:               campos.cpf               || null,
      escola:            campos.escola            || null,
      codigoAluno:       campos.codigoAluno       || null,
    })
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

        <div className={styles.card}>
          <div className={styles.perfilBadge}>
            <span className={styles.perfilIcone}>{config.icon}</span>
            <span className={styles.perfilLabel}>{config.label}</span>
            <button className={styles.trocarPerfil} onClick={() => navigate('/')}>
              ← Trocar perfil
            </button>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${aba === 'entrar' ? styles.tabAtiva : ''}`}
              onClick={() => trocarAba('entrar')}
            >
              Entrar
            </button>
            <button
              className={`${styles.tab} ${aba === 'cadastro' ? styles.tabAtiva : ''}`}
              onClick={() => trocarAba('cadastro')}
            >
              Criar conta
            </button>
          </div>

          {aba === 'entrar' ? (
            <form className={styles.form} onSubmit={handleEntrar} noValidate>
              <div className={styles.campo}>
                <label className={styles.label}>E-mail</label>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="seu@email.com"
                  value={campos.email || ''}
                  onChange={e => atualizarCampo('email', e.target.value)}
                />
              </div>

              <div className={styles.campo}>
                <label className={styles.label}>Senha</label>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.input}
                    type={mostrarSenha ? 'text' : 'password'}
                    placeholder="Sua senha"
                    value={campos.senha || ''}
                    onChange={e => atualizarCampo('senha', e.target.value)}
                  />
                  <button
                    type="button"
                    className={styles.olhoBtn}
                    onClick={() => setMostrarSenha(v => !v)}
                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {mostrarSenha ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {erro && <p className={styles.erro}>{erro}</p>}

              <button type="submit" className={styles.btnPrimario}>Entrar</button>

              <p className={styles.linkSecundario}>
                Esqueceu a senha?{' '}
                <span className={styles.link}>Recuperar acesso</span>
              </p>
            </form>
          ) : (
            <form className={styles.form} onSubmit={handleCadastrar} noValidate>
              {config.camposCadastro.map(campo => (
                <div key={campo.id} className={styles.campo}>
                  <label className={styles.label}>{campo.label}</label>
                  {renderCampo(campo)}
                </div>
              ))}

              {erro && <p className={styles.erro}>{erro}</p>}

              <button type="submit" className={styles.btnPrimario}>Criar conta</button>
            </form>
          )}

          <div className={styles.rodape}>
            <span>🔒</span>
            <span>Dados protegidos por criptografia · LGPD</span>
          </div>
        </div>
      </div>
    </div>
  )
}
