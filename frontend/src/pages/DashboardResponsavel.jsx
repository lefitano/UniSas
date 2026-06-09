import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar   from '../components/ui/TopBar'
import TabNav   from '../components/dashboard/TabNav'
import StatCard from '../components/dashboard/StatCard'
import { getUsuario, getUsuarios, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import { getTurmaPorId } from '../services/turmaService'
import { getAtividadesDaTurma } from '../services/atividadeService'
import { getNotasDoAluno } from '../services/notaService'
import { BsBarChart, BsCheckCircle, BsClipboard, BsPeopleFill } from 'react-icons/bs'
import styles from './Dashboard.module.css'

const labelTurno = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite' }

export default function DashboardResponsavel() {
  const navigate = useNavigate()
  const [responsavel, setResponsavel] = useState(null)
  const [aluno, setAluno]             = useState(null)
  const [turma, setTurma]             = useState(null)
  const [pendentes, setPendentes]     = useState([])
  const [notas, setNotas]             = useState([])

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'responsavel') { navigate('/'); return }
      setResponsavel(dados)

      const codigoAluno = dados.codigo_aluno || dados.codigoAluno
      if (!codigoAluno) return

      try {
        const todos  = await getUsuarios()
        const aluno  = todos.find(u => u.perfil === 'aluno' && u.matricula === codigoAluno)
        if (!aluno) return
        setAluno(aluno)

        if (aluno.turma_id) {
          const [t, atividades, entregas] = await Promise.all([
            getTurmaPorId(aluno.turma_id),
            getAtividadesDaTurma(aluno.turma_id),
            getNotasDoAluno(aluno.id),
          ])
          setTurma(t)
          const entregasIds = new Set(entregas.map(e => e.atividade_id))
          setPendentes(atividades.filter(a => !entregasIds.has(a.id)))
          setNotas(entregas)
        } else {
          const entregas = await getNotasDoAluno(aluno.id)
          setNotas(entregas)
        }
      } catch {
        // segue sem dados se falhar
      }
    }
    carregar()
  }, [navigate])

  if (!responsavel) return null

  const primeiroNome = responsavel.nome.split(' ')[0]

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={responsavel.nome}
        cargo="Responsável"
        avatarCor={avatarCores.responsavel}
        avatarLetras={getIniciais(responsavel.nome)}
      />

      <TabNav abas={[
        { label: 'Acompanhamento', rota: '/dashboard/responsavel' },
        'Frequência',
        { label: 'Notas', rota: '/responsavel/notas' },
        'Chat com escola',
      ]} />

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>
              {aluno ? `Acompanhando: ${aluno.nome}` : 'Acompanhe o desempenho do seu filho'}
            </p>
          </div>
          <span className={styles.bannerBadge}>Responsável</span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard icon={<BsPeopleFill size={16} />}  label="Aluno vinculado"      valor={aluno ? '1' : '—'}              sub={aluno ? aluno.nome.split(' ')[0] : 'Não vinculado'}     cor="verde"   />
          <StatCard icon={<BsCheckCircle size={16} />} label="Turma"                valor={turma ? turma.nome : '—'}       sub={turma ? (labelTurno[turma.turno] ?? turma.turno) : 'Sem turma'} cor="verde"   />
          <StatCard icon={<BsClipboard size={16} />}   label="Atividades pendentes" valor={String(pendentes.length)}       sub={pendentes.length === 0 ? 'Tudo em dia' : 'Pendentes'}  cor="amarelo" />
          <StatCard icon={<BsBarChart size={16} />}    label="Notas lançadas"       valor={String(notas.length)}           sub={notas.length === 0 ? 'Nenhuma ainda' : 'Este período'}  cor="amarelo" />
        </div>

        {aluno && (
          <div className={styles.listaCard}>
            <div className={styles.listaHeader}><span>Dados do aluno</span></div>
            <div className={styles.progressoItem} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--texto)' }}>{aluno.nome}</span>
              <span style={{ fontSize: 12, color: 'var(--cinza-texto)' }}>
                {aluno.matricula ? `Matrícula: ${aluno.matricula}` : 'Sem matrícula'}
                {turma ? ` · ${turma.nome}` : ''}
              </span>
            </div>
          </div>
        )}

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Atividades pendentes</span></div>
          {pendentes.length === 0
            ? <p className={styles.vazio}>{aluno ? 'Nenhuma atividade pendente.' : 'Nenhum aluno vinculado.'}</p>
            : pendentes.slice(0, 3).map(a => (
                <div key={a.id} className={styles.progressoItem} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--texto)' }}>{a.titulo}</span>
                  <span style={{ fontSize: 11, color: 'var(--cinza-texto)' }}>
                    {a.prazo ? new Date(a.prazo).toLocaleDateString('pt-BR') : 'Sem prazo'}
                  </span>
                </div>
              ))
          }
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Notas recentes</span></div>
          {notas.length === 0
            ? <p className={styles.vazio}>{aluno ? 'Nenhuma nota registrada.' : 'Nenhum aluno vinculado.'}</p>
            : notas.slice(0, 3).map(n => (
                <div key={n.id} className={styles.progressoItem} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--texto)' }}>
                    {n.atividades?.titulo ?? 'Atividade'}
                  </span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: n.nota >= 6 ? 'var(--verde)' : '#dc2626' }}>
                    {n.nota ?? '—'}
                  </span>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}
