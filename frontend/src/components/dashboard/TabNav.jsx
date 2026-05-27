import { useNavigate, useLocation } from 'react-router-dom'
import styles from './TabNav.module.css'

export default function TabNav({ abas }) {
  const navigate       = useNavigate()
  const { pathname }   = useLocation()

  return (
    <div className={styles.tabs}>
      {abas.map(aba => {
        const label = typeof aba === 'string' ? aba : aba.label
        const rota  = typeof aba === 'string' ? null : aba.rota
        const ativa = rota
          ? pathname === rota || pathname.startsWith(rota + '/')
          : false

        return (
          <span
            key={label}
            className={`${styles.tab} ${ativa ? styles.tabAtiva : ''} ${!rota ? styles.tabSemRota : ''}`}
            onClick={rota ? () => navigate(rota) : undefined}
          >
            {label}
          </span>
        )
      })}
    </div>
  )
}
