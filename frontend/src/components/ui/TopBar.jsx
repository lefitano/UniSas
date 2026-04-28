import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { limparUsuario } from '../../utils/usuario'
import styles from './TopBar.module.css'

export default function TopBar({ nome, cargo, avatarCor, avatarLetras, xp }) {
  const navigate     = useNavigate()
  const [menuAberto, setMenuAberto] = useState(false)
  const wrapperRef   = useRef(null)

  useEffect(() => {
    if (!menuAberto) return
    function handleClickFora(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMenuAberto(false)
      }
    }
    document.addEventListener('mousedown', handleClickFora)
    return () => document.removeEventListener('mousedown', handleClickFora)
  }, [menuAberto])

  function handleSair() {
    limparUsuario()
    navigate('/')
  }

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

        <div className={styles.usuarioWrapper} ref={wrapperRef}>
          <div className={styles.usuario} onClick={() => setMenuAberto(v => !v)}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{nome}</span>
              <span className={styles.userRole}>{cargo}</span>
            </div>
            <div className={styles.avatar} style={{ background: avatarCor }}>
              {avatarLetras}
            </div>
          </div>

          {menuAberto && (
            <div className={styles.dropdown}>
              <button
                className={styles.dropdownItem}
                onClick={() => { setMenuAberto(false); navigate('/perfil/editar') }}
              >
                <span>✏️</span> Editar perfil
              </button>
              <button
                className={styles.dropdownItem}
                onClick={() => { setMenuAberto(false); navigate('/perfil/configuracoes') }}
              >
                <span>⚙️</span> Configurações
              </button>
              <div className={styles.dropdownDivisor} />
              <button
                className={`${styles.dropdownItem} ${styles.dropdownSair}`}
                onClick={handleSair}
              >
                <span>🚪</span> Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
