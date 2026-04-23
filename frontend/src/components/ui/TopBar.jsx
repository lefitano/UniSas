import { useNavigate } from 'react-router-dom'
import styles from './TopBar.module.css'

export default function TopBar({ nome, cargo, avatarCor, avatarLetras, xp }) {
  const navigate = useNavigate()

  return (
    <div className={styles.topbar}>
      <div className={styles.marca}>
        <span className={styles.logoIcon}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="4" width="14" height="10" rx="2" fill="#1a3a23"/>
            <rect x="3" y="6" width="4" height="1.2" rx="0.6" fill="#F0C040"/>
            <rect x="3" y="8.5" width="6" height="1" rx="0.5" fill="rgba(255,255,255,0.7)"/>
          </svg>
        </span>
        UniSAS
      </div>

      <div className={styles.direita}>
        {xp && <span className={styles.xp}>⭐ {xp} XP</span>}
        <div className={styles.usuario} onClick={() => navigate('/')}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{nome}</span>
            <span className={styles.userRole}>{cargo}</span>
          </div>
          <div className={styles.avatar} style={{ background: avatarCor }}>
            {avatarLetras}
          </div>
        </div>
      </div>
    </div>
  )
}
