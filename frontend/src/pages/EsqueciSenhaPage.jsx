import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { solicitarRecuperacao } from '../services/authService'
import { BsShieldLock } from 'react-icons/bs'
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

export default function EsqueciSenhaPage() {
  const navigate   = useNavigate()
  const [email, setEmail]         = useState('')
  const [erro, setErro]           = useState('')
  const [linkRecuperacao, setLink] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) { setErro('Informe o e-mail.'); return }
    setErro('')
    setCarregando(true)
    try {
      const resultado = await solicitarRecuperacao(email)
      setLink(resultado.link)
    } catch (e) {
      setErro(e.message || 'Nenhuma conta encontrada com esse e-mail.')
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
          <button className={styles.voltar} onClick={() => navigate(-1)}>
            ← Voltar
          </button>

          <h2 className={styles.titulo}>Recuperar senha</h2>
          <p className={styles.subtitulo}>Informe o e-mail da sua conta</p>

          {!linkRecuperacao ? (
            <form onSubmit={handleSubmit}>
              <div className={styles.campo}>
                <label>E-mail institucional</label>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="seunome@escola.edu.br"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErro('') }}
                />
              </div>

              {erro && <p className={styles.erro}>{erro}</p>}

              <button type="submit" className={styles.btnPrimario} disabled={carregando}>
                {carregando ? 'Verificando...' : 'Gerar link de recuperação'}
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 13, color: 'var(--texto)', lineHeight: 1.5 }}>
                Link gerado com sucesso. Em produção, esse link seria enviado por e-mail.
                Para fins de demonstração, clique abaixo:
              </p>
              <a
                href={linkRecuperacao}
                className={styles.btnPrimario}
                style={{ textAlign: 'center', textDecoration: 'none', lineHeight: '44px', display: 'block' }}
              >
                Redefinir minha senha
              </a>
              <p className={styles.linkSecundario}>
                <span className={styles.link} onClick={() => navigate('/')}>Voltar ao login</span>
              </p>
            </div>
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
