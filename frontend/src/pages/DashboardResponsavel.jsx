import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import StatCard      from '../components/dashboard/StatCard'
import ListItem      from '../components/dashboard/ListItem'
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

  const notas = [
    { icon: '➗', titulo: 'Prova de Matemática — Bimestre 2', sub: 'Prof. Carlos Lima · 15/04', nota: '9,0', cor: '#2D7A3A', iconBg: 'verde' },
    { icon: '📖', titulo: 'Redação — Português',              sub: 'Prof. Mariana · 12/04',    nota: '7,5', cor: '#92630A', iconBg: 'amarelo' },
    { icon: '🔬', titulo: 'Trabalho de Ciências',             sub: 'Prof. Roberta · 10/04',    nota: '8,5', cor: '#2D7A3A', iconBg: 'verde' },
  ]

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo="Responsável"
        avatarCor={avatarCores.responsavel}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <TabNav abas={['Acompanhamento', 'Frequência', 'Notas', 'Chat com escola']} />

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>Acompanhe o desempenho do seu filho</p>
          </div>
          <span className={styles.bannerBadge}>Responsável</span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard icon="📊" label="Média geral"          valor="8,4" sub="Acima da média da turma" cor="verde"   />
          <StatCard icon="✅" label="Frequência"            valor="94%" sub="3 faltas no mês"         cor="verde"   />
          <StatCard icon="📝" label="Atividades pendentes" valor="2"   sub="1 vence hoje"             cor="amarelo" />
          <StatCard icon="🏆" label="Conquistas"            valor="12"  sub="+3 esta semana"           cor="verde"   />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Notas recentes</span></div>
          {notas.map((n) => (
            <ListItem
              key={n.titulo}
              icon={n.icon}
              iconBg={n.iconBg}
              titulo={n.titulo}
              sub={n.sub}
              extra={
                <span style={{ fontFamily: 'var(--fonte-display)', fontSize: 16, fontWeight: 700, color: n.cor }}>
                  {n.nota}
                </span>
              }
            />
          ))}
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}>
            <span>Mensagens recentes</span>
            <span className={styles.link}>Abrir chat</span>
          </div>
          <ListItem
            icon="💬" iconBg="azul"
            titulo="Prof. Carlos Lima"
            sub="Seu filho fez ótima participação hoje!"
            badge="Hoje" corBadge="verde"
          />
        </div>
      </div>
    </div>
  )
}
