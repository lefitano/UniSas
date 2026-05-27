import styles from './StatCard.module.css'
export default function StatCard({ icon, label, valor, sub, cor = 'verde' }) {
  return (
    <div className={styles.statCard}>
      <div className={`${styles.statIcon} ${styles[`icon${cor}`]}`}>{icon}</div>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValor}>{valor}</p>
      <p className={styles.statSub}>{sub}</p>
    </div>
  )
}
