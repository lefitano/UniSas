import { useState } from 'react'
import styles from './LoginForm.module.css'

const perfilInfo = {
  ALUNO:       { label: 'Aluno',       icon: '📚' },
  PROFESSOR:   { label: 'Professor',   icon: '🎓' },
  RESPONSAVEL: { label: 'Responsável', icon: '👨‍👧' },
  DIRETOR:     { label: 'Diretor',     icon: '🏫' },
}

export default function LoginForm({ perfil, onVoltar, onLogin }) {
  const [email, setEmail]   = useState('')
  const [senha, setSenha]   = useState('')
  const [erro, setErro]     = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    if (!email || !senha) {
      setErro('Preencha e-mail e senha.')
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
          <label>E-mail institucional</label>
          <input
            type="email"
            placeholder="seunome@escola.edu.br"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.campo}>
          <label>Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {erro && <p className={styles.erro}>{erro}</p>}

        <button type="submit" className={styles.btnEntrar}>
          Entrar no UniSAS
        </button>
      </form>

      <div className={styles.rodape}>
        <span>acesso seguro via JWT</span>
        <span>Dados protegidos conforme a <strong>LGPD</strong></span>
      </div>
    </div>
  )
}
