import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import StatCard      from '../components/dashboard/StatCard'
import ActionButton  from '../components/dashboard/ActionButton'
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
            <p className={styles.bannerSub}>Nenhuma turma ativa ainda</p>
          </div>
          <span className={styles.bannerBadge}>{disciplina}</span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard icon="👥" label="Alunos"               valor="0"  sub="Nenhuma turma ativa" cor="verde"   />
          <StatCard icon="📋" label="Atividades abertas"   valor="0"  sub="Nenhuma criada"      cor="amarelo" />
          <StatCard icon="🎬" label="Conteúdos publicados" valor="0"  sub="Este semestre"       cor="verde"   />
          <StatCard icon="❓" label="Questões no banco"    valor="0"  sub="Nenhuma cadastrada"  cor="amarelo" />
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
          </div>
          <p className={styles.vazio}>Nenhuma turma cadastrada.</p>
        </div>
      </div>
    </div>
  )
}
