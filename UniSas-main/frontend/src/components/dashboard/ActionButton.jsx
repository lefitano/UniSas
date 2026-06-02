import styles from './ActionButton.module.css'
// botoes de ação rápida clicáveis para gerenciamento
export default function ActionButton({ icon, label, onClick }) {
  return (
    <div className={styles.acaoBtn} onClick={onClick}>
      <span className={styles.acaoIcon}>{icon}</span>
      <span className={styles.acaoLabel}>{label}</span>
    </div>
  )
}
