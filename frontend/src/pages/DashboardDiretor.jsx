import TopBar from '../components/ui/TopBar'
import styles from './Dashboard.module.css'

export default function DashboardDiretor() {
  return (
    <div className={styles.pagina}>
      <TopBar nome="Diretora Sandra" cargo="Diretor · E.E. João XXIII" avatarCor="#A32D2D" avatarLetras="SD" />

      <div className={styles.tabs}>
        {['Painel geral', 'Turmas', 'Professores', 'Alunos', 'Relatórios'].map((t, i) => (
          <span key={t} className={`${styles.tab} ${i === 0 ? styles.tabAtiva : ''}`}>{t}</span>
        ))}
      </div>

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>Painel da Direção 🏫</p>
            <p className={styles.bannerSub}>E.E. João XXIII · Ano letivo 2026</p>
          </div>
          <span className={styles.bannerBadge}>Diretor</span>
        </div>

        <div className={styles.cardsGrid}>
          {[
            { icon: '👨‍🎓', label: 'Total de alunos', valor: '412', sub: 'Matrículas ativas',    cor: 'verde' },
            { icon: '👨‍🏫', label: 'Professores',      valor: '18',  sub: 'Em 6 disciplinas',     cor: 'amarelo' },
            { icon: '🏫',  label: 'Turmas ativas',    valor: '14',  sub: 'Fund. II e Médio',      cor: 'verde' },
            { icon: '📈',  label: 'Média da escola',  valor: '7,6', sub: '↑ +0,4 vs bimestre 1', cor: 'amarelo' },
          ].map((card) => (
            <div key={card.label} className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles[`icon${card.cor}`]}`}>{card.icon}</div>
              <p className={styles.statLabel}>{card.label}</p>
              <p className={styles.statValor}>{card.valor}</p>
              <p className={styles.statSub}>{card.sub}</p>
            </div>
          ))}
        </div>

        <p className={styles.secaoTitulo}>Gestão rápida</p>
        <div className={styles.acoesGrid}>
          {[
            { icon: '➕', label: 'Nova turma' },
            { icon: '👤', label: 'Gerenciar usuários' },
            { icon: '📊', label: 'Relatório geral' },
            { icon: '📢', label: 'Comunicado geral' },
          ].map((a) => (
            <div key={a.label} className={styles.acaoBtn}>
              <span className={styles.acaoIcon}>{a.icon}</span>
              <span className={styles.acaoLabel}>{a.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Alertas da semana</span></div>
          <div className={styles.listaItem}>
            <div className={styles.liIcon} style={{ background: '#FEF2F2' }}>⚠️</div>
            <div className={styles.liTexto}>
              <p className={styles.liTitulo}>8º Ano A — frequência abaixo de 75%</p>
              <p className={styles.liSub}>12 alunos com frequência crítica</p>
            </div>
            <span className={styles.badge} style={{ background: '#FEF2F2', color: '#A32D2D' }}>Atenção</span>
          </div>
          <div className={styles.listaItem}>
            <div className={`${styles.liIcon} ${styles.bgAmarelo}`}>📋</div>
            <div className={styles.liTexto}>
              <p className={styles.liTitulo}>Prof. João — materiais não atualizados</p>
              <p className={styles.liSub}>Última postagem há 12 dias</p>
            </div>
            <span className={`${styles.badge} ${styles.badgeAmarelo}`}>Pendente</span>
          </div>
          <div className={styles.listaItem}>
            <div className={`${styles.liIcon} ${styles.bgVerde}`}>🏆</div>
            <div className={styles.liTexto}>
              <p className={styles.liTitulo}>7º Ano C — melhor desempenho do mês</p>
              <p className={styles.liSub}>Média 8,1 · Prof. Carlos Lima</p>
            </div>
            <span className={`${styles.badge} ${styles.badgeVerde}`}>Destaque</span>
          </div>
        </div>
      </div>
    </div>
  )
}
