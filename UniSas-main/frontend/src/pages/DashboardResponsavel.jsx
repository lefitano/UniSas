import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import StatCard      from '../components/dashboard/StatCard'
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
          <StatCard icon="📊" label="Média geral"          valor="—"  sub="Sem dados ainda"       cor="verde"   />
          <StatCard icon="✅" label="Frequência"            valor="—"  sub="Sem registros"         cor="verde"   />
          <StatCard icon="📝" label="Atividades pendentes" valor="0"  sub="Nenhuma pendente"      cor="amarelo" />
          <StatCard icon="🏆" label="Conquistas"            valor="0"  sub="Nenhuma ainda"         cor="verde"   />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Notas recentes</span></div>
          <p className={styles.vazio}>Nenhuma nota registrada.</p>
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Mensagens recentes</span></div>
          <p className={styles.vazio}>Nenhuma mensagem.</p>
        </div>
      </div>
    </div>
  )
}
