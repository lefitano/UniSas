import styles from './TabNav.module.css'

export default function TabNav({ abas, abaAtiva = 0 }) {
  return (
    <div className={styles.tabs}>
      {abas.map((t, i) => (
        <span key={t} className={`${styles.tab} ${i === abaAtiva ? styles.tabAtiva : ''}`}>
          {t}
        </span>
      ))}
    </div>
  )
}
