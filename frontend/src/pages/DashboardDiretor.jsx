import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import StatCard      from '../components/dashboard/StatCard'
import ActionButton  from '../components/dashboard/ActionButton'
import { getUsuario, getUsuarios, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import { getTurmas } from '../services/turmaService'
import { BsMortarboard, BsBriefcase, BsPeopleFill, BsBuilding, BsPlusCircle, BsPersonGear, BsBarChart, BsMegaphone } from 'react-icons/bs'
import styles from './Dashboard.module.css'

export default function DashboardDiretor() {
  const navigate = useNavigate()
  const [usuario,   setUsuario]   = useState(null)
  const [contagens, setContagens] = useState({ alunos: 0, professores: 0, responsaveis: 0, turmas: 0 })

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'diretor') { navigate('/'); return }
      setUsuario(dados)

      try {
        const [lista, turmas] = await Promise.all([getUsuarios(), getTurmas()])
        setContagens({
          alunos:      lista.filter(u => u.perfil === 'aluno').length,
          professores: lista.filter(u => u.perfil === 'professor').length,
          responsaveis: lista.filter(u => u.perfil === 'responsavel').length,
          turmas:      turmas.length,
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
        { label: 'Turmas',       rota: '/gerenciar-turmas'    },
        { label: 'Professores',  rota: '/diretor/professores' },
        { label: 'Alunos',       rota: '/diretor/alunos'      },
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
          <StatCard icon={<BsMortarboard size={16} />}  label="Total de alunos"    valor={String(contagens.alunos)}       sub={contagens.alunos === 0       ? 'Nenhum cadastrado' : 'Matrículas ativas'}  cor="verde"   />
          <StatCard icon={<BsBriefcase size={16} />}    label="Professores"         valor={String(contagens.professores)}  sub={contagens.professores === 0  ? 'Nenhum cadastrado' : 'Em atividade'}        cor="amarelo" />
          <StatCard icon={<BsPeopleFill size={16} />}   label="Responsáveis"        valor={String(contagens.responsaveis)} sub={contagens.responsaveis === 0 ? 'Nenhum cadastrado' : 'Vinculados'}           cor="verde"   />
          <StatCard icon={<BsBuilding size={16} />}     label="Turmas ativas"       valor={String(contagens.turmas)}       sub={contagens.turmas === 0       ? 'Nenhuma turma criada' : 'Turmas cadastradas'} cor="amarelo" />
        </div>

        <p className={styles.secaoTitulo}>Gestão rápida</p>
        <div className={styles.acoesGrid}>
          <ActionButton icon={<BsPlusCircle size={20} />}  label="Nova turma"         onClick={() => navigate('/gerenciar-turmas')} />
          <ActionButton icon={<BsPersonGear size={20} />}  label="Gerenciar usuários" onClick={() => navigate('/gerenciar-usuarios')} />
          <ActionButton icon={<BsBarChart size={20} />}    label="Relatório geral"    />
          <ActionButton icon={<BsMegaphone size={20} />}   label="Comunicado geral"   />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Alertas da semana</span></div>
          <p className={styles.vazio}>Nenhum alerta no momento.</p>
        </div>
      </div>
    </div>
  )
}
