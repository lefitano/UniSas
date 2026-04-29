import { useNavigate } from 'react-router-dom'
import ProfileSelector from '../components/auth/ProfileSelector'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.pagina}>
      <div className={styles.fundo} />

      <div className={styles.conteudo}>
        <div className={styles.marca}>
          <div className={styles.logo}>
            <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
              <rect x="4" y="10" width="28" height="20" rx="4" fill="#1a3a23"/>
              <rect x="8" y="14" width="8" height="2" rx="1" fill="#F0C040"/>
              <rect x="8" y="18" width="12" height="2" rx="1" fill="rgba(255,255,255,0.6)"/>
              <rect x="8" y="22" width="9" height="2" rx="1" fill="rgba(255,255,255,0.4)"/>
              <circle cx="26" cy="10" r="5" fill="#F0C040"/>
              <text x="26" y="14" textAnchor="middle" fontSize="7" fill="#1a3a23" fontWeight="700">A</text>
            </svg>
          </div>
          <span className={styles.nomeApp}>UniSAS</span>
          <span className={styles.tagline}>Sistema Acadêmico Unificado · Rede Pública</span>
        </div>

        <ProfileSelector onContinuar={(perfil) => navigate(`/auth/${perfil}`)} />
      </div>
    </div>
  )
}
