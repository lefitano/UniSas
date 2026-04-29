import styles from './ListItem.module.css'
//componente de alertas para notas,ativididades pendententes e etc.
const bgClasses = {
  verde:    'bgVerde',
  amarelo:  'bgAmarelo',
  vermelho: 'bgVermelho',
  azul:     'bgAzul',
}

const badgeClasses = {
  verde:    'badgeVerde',
  amarelo:  'badgeAmarelo',
  cinza:    'badgeCinza',
  vermelho: 'badgeVermelho',
}

export default function ListItem({ icon, titulo, sub, badge, corBadge = 'cinza', iconBg = 'verde', extra }) {
  return (
    <div className={styles.listaItem}>
      <div className={`${styles.liIcon} ${styles[bgClasses[iconBg]]}`}>{icon}</div>

      <div className={styles.liTexto}>
        <p className={styles.liTitulo}>{titulo}</p>
        <p className={styles.liSub}>{sub}</p>
      </div>

      {badge && (
        <span className={`${styles.badge} ${styles[badgeClasses[corBadge]]}`}>{badge}</span>
      )}

      {extra}
    </div>
  )
}
