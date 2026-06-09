import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar       from '../components/ui/TopBar'
import TabNav       from '../components/dashboard/TabNav'
import StatCard     from '../components/dashboard/StatCard'
import ActionButton from '../components/dashboard/ActionButton'
import { getUsuario, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import { getMinhasTurmas, getAlunosDaTurma } from '../services/turmaService'
import { getAtividades } from '../services/atividadeService'
import { BsPeopleFill, BsClipboard, BsCameraVideo, BsQuestionCircle, BsUpload, BsPencilSquare, BsPatchQuestion, BsBarChartLine } from 'react-icons/bs'
import styles from './Dashboard.module.css'

const labelTurno = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite' }

export default function DashboardProfessor() {
  const navigate = useNavigate()
  const [usuario, setUsuario]         = useState(null)
  const [turmas, setTurmas]                   = useState([])
  const [totalAlunos, setTotalAlunos]         = useState(0)
  const [totalAtividades, setTotalAtividades] = useState(0)

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
      setUsuario(dados)
      try {
        const lista = await getMinhasTurmas()
        setTurmas(lista)
        const turmaIds = new Set(lista.map(t => t.id))
        const [listas, todasAtividades] = await Promise.all([
          Promise.all(lista.map(t => getAlunosDaTurma(t.id))),
          getAtividades(),
        ])
        setTotalAlunos(listas.reduce((acc, alunos) => acc + alunos.length, 0))
        setTotalAtividades(todasAtividades.filter(a => turmaIds.has(a.turma_id)).length)
      } catch {
        // dashboard continua funcionando mesmo se falhar
      }
    }
    carregar()
  }, [navigate])

  if (!usuario) return null

  const primeiroNome        = usuario.nome.split(' ')[0]
  const disciplina          = usuario.disciplina         || 'Sem disciplina'
  const registroFuncional   = usuario.registro_funcional || usuario.registroFuncional || null

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo={`Professor · ${disciplina}`}
        avatarCor={avatarCores.professor}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <TabNav abas={[
        { label: 'Início',        rota: '/dashboard/professor' },
        { label: 'Minhas turmas', rota: '/professor/turmas'    },
        'Conteúdos',
        'Banco de questões',
        'Chat',
      ]} />

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, Prof. {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>
              {registroFuncional ? `Registro funcional: ${registroFuncional}` : 'Bem-vindo ao UniSAS'}
            </p>
          </div>
          <span className={styles.bannerBadge}>{disciplina}</span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard icon={<BsPeopleFill size={16} />}     label="Alunos"               valor={String(totalAlunos)} sub={turmas.length > 0 ? `${turmas.length} turma(s) ativa(s)` : 'Nenhuma turma ativa'} cor="verde"   />
          <StatCard icon={<BsClipboard size={16} />}      label="Atividades abertas"   valor={String(totalAtividades)} sub={totalAtividades === 0 ? 'Nenhuma criada' : `${totalAtividades} atividade(s)`} cor="amarelo" />
          <StatCard icon={<BsCameraVideo size={16} />}    label="Conteúdos publicados" valor="0" sub="Este semestre"       cor="verde"   />
          <StatCard icon={<BsQuestionCircle size={16} />} label="Questões no banco"    valor="0" sub="Nenhuma cadastrada"  cor="amarelo" />
        </div>

        <p className={styles.secaoTitulo}>Ações rápidas</p>
        <div className={styles.acoesGrid}>
          <ActionButton icon={<BsUpload size={20} />}        label="Upload de aula" onClick={() => navigate('/em-breve')} />
          <ActionButton icon={<BsPencilSquare size={20} />}  label="Nova atividade" onClick={() => navigate('/professor/atividades/nova')} />
          <ActionButton icon={<BsPatchQuestion size={20} />} label="Criar questão"  onClick={() => navigate('/em-breve')} />
          <ActionButton icon={<BsBarChartLine size={20} />}  label="Ver desempenho" onClick={() => navigate('/professor/atividades')} />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}>
            <span>Minhas turmas</span>
            <span className={styles.link} onClick={() => navigate('/professor/turmas')}>Ver todas</span>
          </div>
          {turmas.length === 0 && <p className={styles.vazio}>Nenhuma turma atribuída.</p>}
          {turmas.map(t => (
            <div key={t.id} className={styles.progressoItem} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--texto)' }}>{t.nome}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, color: 'var(--cinza-texto)' }}>{labelTurno[t.turno] ?? t.turno}</span>
                <span className={styles.link} onClick={() => navigate(`/professor/turmas/${t.id}`)}>Ver alunos</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
