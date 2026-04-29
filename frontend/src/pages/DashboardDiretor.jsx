import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import StatCard      from '../components/dashboard/StatCard'
import ActionButton  from '../components/dashboard/ActionButton'
import ListItem      from '../components/dashboard/ListItem'
import { getUsuario, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'

export default function DashboardDiretor() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'diretor') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  const primeiroNome = usuario.nome.split(' ')[0]
  const escola       = usuario.escola || 'Minha Escola'

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo={`Diretor · ${escola}`}
        avatarCor={avatarCores.diretor}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <TabNav abas={['Painel geral', 'Turmas', 'Professores', 'Alunos', 'Relatórios']} />

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>{escola} · Ano letivo 2026</p>
          </div>
          <span className={styles.bannerBadge}>Diretor</span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard icon="👨‍🎓" label="Total de alunos" valor="412" sub="Matrículas ativas"    cor="verde"   />
          <StatCard icon="👨‍🏫" label="Professores"      valor="18"  sub="Em 6 disciplinas"     cor="amarelo" />
          <StatCard icon="🏫"  label="Turmas ativas"    valor="14"  sub="Fund. II e Médio"      cor="verde"   />
          <StatCard icon="📈"  label="Média da escola"  valor="7,6" sub="↑ +0,4 vs bimestre 1" cor="amarelo" />
        </div>

        <p className={styles.secaoTitulo}>Gestão rápida</p>
        <div className={styles.acoesGrid}>
          <ActionButton icon="➕" label="Nova turma"          />
          <ActionButton icon="👤" label="Gerenciar usuários"  onClick={() => navigate('/gerenciar-usuarios')} />
          <ActionButton icon="📊" label="Relatório geral"     />
          <ActionButton icon="📢" label="Comunicado geral"    />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Alertas da semana</span></div>
          <ListItem icon="⚠️" iconBg="vermelho" titulo="8º Ano A — frequência abaixo de 75%" sub="12 alunos com frequência crítica"    badge="Atenção"  corBadge="vermelho" />
          <ListItem icon="📋" iconBg="amarelo"  titulo="Prof. João — materiais não atualizados" sub="Última postagem há 12 dias"       badge="Pendente" corBadge="amarelo"  />
          <ListItem icon="🏆" iconBg="verde"    titulo="7º Ano C — melhor desempenho do mês"    sub="Média 8,1 · Prof. Carlos Lima"   badge="Destaque" corBadge="verde"    />
        </div>
      </div>
    </div>
  )
}
