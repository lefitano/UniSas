import TopBar from '../components/ui/TopBar'
import styles from './Dashboard.module.css'

export default function DashboardAluno() {
  return (
    <div className={styles.pagina}>
      <TopBar nome="Ana Souza" cargo="Aluna · 9º Ano B" avatarCor="#2D7A3A" avatarLetras="AS" xp="340" />

      <div className={styles.tabs}>
        {['Início', 'Minhas aulas', 'Atividades', 'Chat', 'Downloads'].map((t, i) => (
          <span key={t} className={`${styles.tab} ${i === 0 ? styles.tabAtiva : ''}`}>{t}</span>
        ))}
      </div>

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>Bom dia, Ana! 👋</p>
            <p className={styles.bannerSub}>Você tem 2 atividades pendentes hoje</p>
          </div>
          <span className={styles.bannerBadge}>9º Ano B</span>
        </div>

        <div className={styles.cardsGrid}>
          {[
            { icon: '📈', label: 'Média geral',        valor: '8,4', sub: '↑ +0,3 esse mês',      cor: 'verde' },
            { icon: '🏆', label: 'Conquistas',          valor: '12',  sub: '3 novas esta semana',  cor: 'amarelo' },
            { icon: '✅', label: 'Frequência',          valor: '94%', sub: 'Acima da meta',         cor: 'verde' },
            { icon: '📥', label: 'Conteúdos offline',  valor: '7',   sub: 'Disponíveis',           cor: 'amarelo' },
          ].map((card) => (
            <div key={card.label} className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles[`icon${card.cor}`]}`}>{card.icon}</div>
              <p className={styles.statLabel}>{card.label}</p>
              <p className={styles.statValor}>{card.valor}</p>
              <p className={styles.statSub}>{card.sub}</p>
            </div>
          ))}
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}>
            <span>Atividades pendentes</span><span className={styles.link}>Ver todas</span>
          </div>
          <div className={styles.listaItem}>
            <div className={`${styles.liIcon} ${styles.bgAmarelo}`}>📝</div>
            <div className={styles.liTexto}>
              <p className={styles.liTitulo}>Simulado de Matemática</p>
              <p className={styles.liSub}>Prof. Carlos · Vence hoje às 23h</p>
            </div>
            <span className={`${styles.badge} ${styles.badgeAmarelo}`}>Urgente</span>
          </div>
          <div className={styles.listaItem}>
            <div className={`${styles.liIcon} ${styles.bgVerde}`}>📖</div>
            <div className={styles.liTexto}>
              <p className={styles.liTitulo}>Leitura: Capítulo 5 — Português</p>
              <p className={styles.liSub}>Prof. Mariana · Prazo: amanhã</p>
            </div>
            <span className={`${styles.badge} ${styles.badgeCinza}`}>Pendente</span>
          </div>
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Progresso por disciplina</span></div>
          {[
            { nome: 'Matemática', pct: 78 },
            { nome: 'Português',  pct: 91 },
            { nome: 'Ciências',   pct: 65 },
          ].map((d) => (
            <div key={d.nome} className={styles.progressoItem}>
              <div className={styles.progressoTopo}>
                <span>{d.nome}</span>
                <span className={styles.pct}>{d.pct}%</span>
              </div>
              <div className={styles.barraFundo}>
                <div className={styles.barra} style={{ width: `${d.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
