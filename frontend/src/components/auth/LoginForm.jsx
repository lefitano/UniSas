import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsBook, BsMortarboard, BsPeople, BsBuilding, BsEye, BsEyeSlash, BsShieldLock } from 'react-icons/bs'
import styles from './LoginForm.module.css'

const perfilInfo = {
  aluno:       { label: 'Aluno',       icon: <BsBook size={18} /> },
  professor:   { label: 'Professor',   icon: <BsMortarboard size={18} /> },
  responsavel: { label: 'Responsável', icon: <BsPeople size={18} /> },
  diretor:     { label: 'Diretor',     icon: <BsBuilding size={18} /> },
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginForm({ perfil, onVoltar, onLogin, onCadastrar, erroExterno, carregando }) {
  const navigate = useNavigate()
  const [email, setEmail]               = useState('')
  const [senha, setSenha]               = useState('')
  const [erro, setErro]                 = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    if (!email || !senha) {
      setErro('Preencha e-mail e senha.')
      return
    }

    if (!emailRegex.test(email)) {
      setErro('Informe um e-mail válido.')
      return
    }

    onLogin({ email, senha, perfil })
  }

  const info = perfilInfo[perfil]

  return (
    <div className={styles.card}>
      <button className={styles.voltar} onClick={onVoltar}>
        ← Trocar perfil
      </button>

      <div className={styles.badge}>
        {info.icon} {info.label}
      </div>

      <h2 className={styles.titulo}>Acesse sua conta</h2>
      <p className={styles.subtitulo}>Use o e-mail institucional da sua escola</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.campo}>
          <label htmlFor="email">E-mail institucional</label>
          <input
            id="email"
            type="email"
            placeholder="seunome@escola.edu.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.campo}>
          <label htmlFor="senha">Senha</label>
          <div className={styles.inputWrapper}>
            <input
              id="senha"
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              type="button"
              className={styles.olhoBtn}
              onClick={() => setMostrarSenha(v => !v)}
              aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {mostrarSenha ? <BsEyeSlash size={15} /> : <BsEye size={15} />}
            </button>
          </div>
        </div>

        {erro        && <p className={styles.erro}>{erro}</p>}
        {erroExterno && <p className={styles.erro}>{erroExterno}</p>}

        <p className={styles.linkEsqueci}>
          <span className={styles.link} onClick={() => navigate('/esqueci-senha')}>
            Esqueci minha senha
          </span>
        </p>

        <button type="submit" className={styles.btnEntrar} disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar no UniSAS'}
        </button>

        {onCadastrar && (
          <p className={styles.linkSecundario}>
            Não tem uma conta?{' '}
            <span className={styles.link} onClick={onCadastrar}>
              Cadastre-se
            </span>
          </p>
        )}
      </form>

      <div className={styles.rodape}>
        <BsShieldLock size={14} />
        <span>Dados protegidos conforme a <strong>LGPD</strong></span>
      </div>
    </div>
  )
}
