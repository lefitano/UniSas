import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import StatCard      from '../components/dashboard/StatCard'
import ActionButton  from '../components/dashboard/ActionButton'
import { getUsuario, getUsuarios, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'

export default function DashboardDiretor() {
  const navigate = useNavigate()
  const [usuario,   setUsuario]   = useState(null)
  const [contagens, setContagens] = useState({ alunos: 0, professores: 0, responsaveis: 0 })

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'diretor') { navigate('/'); return }
      setUsuario(dados)

      try {
        const lista = await getUsuarios()
        setContagens({
          alunos:      lista.filter(u => u.perfil === 'aluno').length,
          professores: lista.filter(u => u.perfil === 'professor').length,
          responsaveis: lista.filter(u => u.perfil === 'responsavel').length,
        })
      } catch {}
    }
    carregar()
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

      <TabNav abas={[
        { label: 'Painel geral', rota: '/dashboard/diretor' },
        { label: 'Turmas',       rota: '/gerenciar-turmas'  },
        'Professores',
        'Alunos',
        'Relatórios',
      ]} />

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>{escola} · Ano letivo 2026</p>
          </div>
          <span className={styles.bannerBadge}>Diretor</span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard icon="👨‍🎓" label="Total de alunos"    valor={String(contagens.alunos)}      sub={contagens.alunos === 0      ? 'Nenhum cadastrado' : 'Matrículas ativas'}  cor="verde"   />
          <StatCard icon="👨‍🏫" label="Professores"         valor={String(contagens.professores)} sub={contagens.professores === 0 ? 'Nenhum cadastrado' : 'Em atividade'}        cor="amarelo" />
          <StatCard icon="👨‍👩‍👧" label="Responsáveis"      valor={String(contagens.responsaveis)}sub={contagens.responsaveis === 0? 'Nenhum cadastrado' : 'Vinculados'}           cor="verde"   />
          <StatCard icon="🏫"  label="Turmas ativas"       valor="0"                             sub="Nenhuma turma criada"                                                       cor="amarelo" />
        </div>

        <p className={styles.secaoTitulo}>Gestão rápida</p>
        <div className={styles.acoesGrid}>
          <ActionButton icon="➕" label="Nova turma"         onClick={() => navigate('/gerenciar-turmas')} />
          <ActionButton icon="👤" label="Gerenciar usuários" onClick={() => navigate('/gerenciar-usuarios')} />
          <ActionButton icon="📊" label="Relatório geral"    />
          <ActionButton icon="📢" label="Comunicado geral"   />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Alertas da semana</span></div>
          <p className={styles.vazio}>Nenhum alerta no momento.</p>
        </div>
      </div>
    </div>
  )
}
