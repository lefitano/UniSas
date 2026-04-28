import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/ui/TopBar'
import { getUsuario, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'

export default function DashboardResponsavel() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'responsavel') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  const primeiroNome = usuario.nome.split(' ')[0]

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo="Responsável"
        avatarCor={avatarCores.responsavel}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <div className={styles.tabs}>
        {['Acompanhamento', 'Frequência', 'Notas', 'Chat com escola'].map((t, i) => (
          <span key={t} className={`${styles.tab} ${i === 0 ? styles.tabAtiva : ''}`}>{t}</span>
        ))}
      </div>

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>Acompanhe o desempenho do seu filho</p>
          </div>
          <span className={styles.bannerBadge}>Responsável</span>
        </div>

        <div className={styles.cardsGrid}>
          {[
            { icon: '📊', label: 'Média geral',          valor: '8,4', sub: 'Acima da média da turma', cor: 'verde' },
            { icon: '✅', label: 'Frequência',            valor: '94%', sub: '3 faltas no mês',         cor: 'verde' },
            { icon: '📝', label: 'Atividades pendentes', valor: '2',   sub: '1 vence hoje',             cor: 'amarelo' },
            { icon: '🏆', label: 'Conquistas',            valor: '12',  sub: '+3 esta semana',           cor: 'verde' },
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
          <div className={styles.listaHeader}><span>Notas recentes</span></div>
          {[
            { icon: '➗', materia: 'Prova de Matemática — Bimestre 2', prof: 'Prof. Carlos Lima · 15/04', nota: '9,0', cor: '#2D7A3A', bg: 'bgVerde' },
            { icon: '📖', materia: 'Redação — Português',              prof: 'Prof. Mariana · 12/04',    nota: '7,5', cor: '#92630A', bg: 'bgAmarelo' },
            { icon: '🔬', materia: 'Trabalho de Ciências',             prof: 'Prof. Roberta · 10/04',    nota: '8,5', cor: '#2D7A3A', bg: 'bgVerde' },
          ].map((n) => (
            <div key={n.materia} className={styles.listaItem}>
              <div className={`${styles.liIcon} ${styles[n.bg]}`}>{n.icon}</div>
              <div className={styles.liTexto}>
                <p className={styles.liTitulo}>{n.materia}</p>
                <p className={styles.liSub}>{n.prof}</p>
              </div>
              <span style={{ fontFamily: 'var(--fonte-display)', fontSize: 16, fontWeight: 700, color: n.cor }}>{n.nota}</span>
            </div>
          ))}
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}>
            <span>Mensagens recentes</span><span className={styles.link}>Abrir chat</span>
          </div>
          <div className={styles.listaItem}>
            <div className={`${styles.liIcon}`} style={{ background: '#EEF2FF' }}>💬</div>
            <div className={styles.liTexto}>
              <p className={styles.liTitulo}>Prof. Carlos Lima</p>
              <p className={styles.liSub}>Seu filho fez ótima participação hoje!</p>
            </div>
            <span className={`${styles.badge} ${styles.badgeVerde}`}>Hoje</span>
          </div>
        </div>
      </div>
    </div>
  )
}
