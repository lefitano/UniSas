import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import StatCard      from '../components/dashboard/StatCard'
import ActionButton  from '../components/dashboard/ActionButton'
import ListItem      from '../components/dashboard/ListItem'
import { getUsuario, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'

export default function DashboardProfessor() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  const primeiroNome = usuario.nome.split(' ')[0]
  const disciplina   = usuario.disciplina || 'Professor'

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo={`Professor · ${disciplina}`}
        avatarCor={avatarCores.professor}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <TabNav abas={['Início', 'Minhas turmas', 'Conteúdos', 'Banco de questões', 'Chat']} />

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, Prof. {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>3 turmas ativas · 87 alunos no total</p>
          </div>
          <span className={styles.bannerBadge}>{disciplina}</span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard icon="👥" label="Alunos"               valor="87"  sub="3 turmas ativas" cor="verde"   />
          <StatCard icon="📋" label="Atividades abertas"   valor="5"   sub="2 vencem hoje"   cor="amarelo" />
          <StatCard icon="🎬" label="Conteúdos publicados" valor="24"  sub="Este semestre"   cor="verde"   />
          <StatCard icon="❓" label="Questões no banco"    valor="142" sub="Disponíveis"     cor="amarelo" />
        </div>

        <p className={styles.secaoTitulo}>Ações rápidas</p>
        <div className={styles.acoesGrid}>
          <ActionButton icon="📤" label="Upload de aula"  />
          <ActionButton icon="📝" label="Nova atividade"  />
          <ActionButton icon="❓" label="Criar questão"   />
          <ActionButton icon="📊" label="Ver desempenho"  />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}>
            <span>Minhas turmas</span>
            <span className={styles.link}>Gerenciar</span>
          </div>
          <ListItem icon="🏫" iconBg="verde"   titulo="9º Ano B · Matemática" sub="32 alunos · Média: 7,8" badge="Ativa"   corBadge="verde"   />
          <ListItem icon="🏫" iconBg="amarelo" titulo="8º Ano A · Matemática" sub="29 alunos · Média: 6,9" badge="Atenção" corBadge="amarelo" />
          <ListItem icon="🏫" iconBg="verde"   titulo="7º Ano C · Matemática" sub="26 alunos · Média: 8,1" badge="Ativa"   corBadge="verde"   />
        </div>
      </div>
    </div>
  )
}
