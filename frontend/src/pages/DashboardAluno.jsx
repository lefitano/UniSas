import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import StatCard      from '../components/dashboard/StatCard'
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
          <StatCard icon="📈" label="Média geral"       valor="—"  sub="Sem dados ainda"   cor="verde"   />
          <StatCard icon="🏆" label="Conquistas"         valor="0"  sub="Nenhuma ainda"     cor="amarelo" />
          <StatCard icon="✅" label="Frequência"         valor="—"  sub="Sem registros"     cor="verde"   />
          <StatCard icon="📥" label="Conteúdos offline" valor="0"  sub="Nenhum disponível" cor="amarelo" />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}>
            <span>Atividades pendentes</span>
          </div>
          <p className={styles.vazio}>Nenhuma atividade pendente.</p>
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Progresso por disciplina</span></div>
          <p className={styles.vazio}>Nenhum progresso registrado.</p>
        </div>
      </div>
    </div>
  )
}
