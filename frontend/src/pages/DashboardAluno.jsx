import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import StatCard      from '../components/dashboard/StatCard'
import ListItem      from '../components/dashboard/ListItem'
import { getUsuario, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'

export default function DashboardAluno() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'aluno') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  const primeiroNome = usuario.nome.split(' ')[0]

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo="Aluno"
        avatarCor={avatarCores.aluno}
        avatarLetras={getIniciais(usuario.nome)}
        xp="340"
      />

      <TabNav abas={['Início', 'Minhas aulas', 'Atividades', 'Chat', 'Downloads']} />

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>Você tem 2 atividades pendentes hoje</p>
          </div>
          <span className={styles.bannerBadge}>9º Ano B</span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard icon="📈" label="Média geral"       valor="8,4" sub="↑ +0,3 esse mês"     cor="verde"   />
          <StatCard icon="🏆" label="Conquistas"         valor="12"  sub="3 novas esta semana" cor="amarelo" />
          <StatCard icon="✅" label="Frequência"         valor="94%" sub="Acima da meta"        cor="verde"   />
          <StatCard icon="📥" label="Conteúdos offline" valor="7"   sub="Disponíveis"          cor="amarelo" />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}>
            <span>Atividades pendentes</span>
            <span className={styles.link}>Ver todas</span>
          </div>
          <ListItem
            icon="📝" iconBg="amarelo"
            titulo="Simulado de Matemática"
            sub="Prof. Carlos · Vence hoje às 23h"
            badge="Urgente" corBadge="amarelo"
          />
          <ListItem
            icon="📖" iconBg="verde"
            titulo="Leitura: Capítulo 5 — Português"
            sub="Prof. Mariana · Prazo: amanhã"
            badge="Pendente" corBadge="cinza"
          />
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
