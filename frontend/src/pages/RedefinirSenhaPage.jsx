import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { redefinirSenha } from '../services/authService'
import { BsEye, BsEyeSlash, BsShieldLock } from 'react-icons/bs'
import styles from './AuthPage.module.css'

const Logo = () => (
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
)

export default function RedefinirSenhaPage() {
  const navigate      = useNavigate()
  const [params]      = useSearchParams()
  const token         = params.get('token') || ''

  const [novaSenha, setNovaSenha]         = useState('')
  const [confirmar, setConfirmar]         = useState('')
  const [mostrarSenha, setMostrarSenha]   = useState(false)
  const [erro, setErro]                   = useState('')
  const [sucesso, setSucesso]             = useState(false)
  const [carregando, setCarregando]       = useState(false)

  if (!token) {
    return (
      <div className={styles.pagina}>
        <div className={styles.fundo} />
        <div className={styles.conteudo}>
          <Logo />
          <div className={styles.card}>
            <p className={styles.erro}>Link inválido ou expirado.</p>
            <p className={styles.linkSecundario} style={{ marginTop: 12 }}>
              <span className={styles.link} onClick={() => navigate('/esqueci-senha')}>
                Solicitar novo link
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!novaSenha || !confirmar) { setErro('Preencha os dois campos.'); return }
    if (novaSenha.length < 8)     { setErro('A senha deve ter no mínimo 8 caracteres.'); return }
    if (novaSenha !== confirmar)  { setErro('As senhas não coincidem.'); return }
    setErro('')
    setCarregando(true)
    try {
      await redefinirSenha(token, novaSenha)
      setSucesso(true)
    } catch (e) {
      setErro(e.message || 'Erro ao redefinir senha. O link pode ter expirado.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.fundo} />
      <div className={styles.conteudo}>
        <Logo />

        <div className={styles.card}>
          <h2 className={styles.titulo}>Nova senha</h2>
          <p className={styles.subtitulo}>Escolha uma senha segura para sua conta</p>

          {sucesso ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 13, color: 'var(--verde)', fontWeight: 600 }}>
                Senha redefinida com sucesso!
              </p>
              <button className={styles.btnPrimario} onClick={() => navigate('/')}>
                Ir para o login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.campo}>
                <label>Nova senha</label>
                <div className={styles.inputWrapper}>
                  <input
                    className={styles.input}
                    type={mostrarSenha ? 'text' : 'password'}
                    placeholder="Mínimo 8 caracteres"
                    value={novaSenha}
                    onChange={e => { setNovaSenha(e.target.value); setErro('') }}
                  />
                  <button
                    type="button"
                    className={styles.olhoBtn}
                    onClick={() => setMostrarSenha(v => !v)}
                  >
                    {mostrarSenha ? <BsEyeSlash size={15} /> : <BsEye size={15} />}
                  </button>
                </div>
              </div>

              <div className={styles.campo}>
                <label>Confirmar nova senha</label>
                <input
                  className={styles.input}
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Repita a senha"
                  value={confirmar}
                  onChange={e => { setConfirmar(e.target.value); setErro('') }}
                />
              </div>

              {erro && <p className={styles.erro}>{erro}</p>}

              <button type="submit" className={styles.btnPrimario} disabled={carregando}>
                {carregando ? 'Salvando...' : 'Redefinir senha'}
              </button>
            </form>
          )}

          <div className={styles.rodape}>
            <BsShieldLock size={14} />
            <span>Dados protegidos conforme a <strong>LGPD</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}
