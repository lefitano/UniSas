import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar   from '../components/ui/TopBar'
import TabNav   from '../components/dashboard/TabNav'
import StatCard from '../components/dashboard/StatCard'
import { getUsuario, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import { getTurmaPorId } from '../services/turmaService'
import { getAtividadesDaTurma } from '../services/atividadeService'
import { getNotasDoAluno } from '../services/notaService'
import { getConteudosPorTurma } from '../services/conteudoService'
import { BsGraphUp, BsCheckCircle, BsFilePdf, BsPlayCircle } from 'react-icons/bs'
import styles from './Dashboard.module.css'

const labelTurno = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite' }

export default function DashboardAluno() {
  const navigate = useNavigate()
  const [usuario, setUsuario]         = useState(null)
  const [turma, setTurma]             = useState(null)
  const [pendentes, setPendentes]     = useState([])
  const [media, setMedia]             = useState(null)
  const [aulas, setAulas]             = useState([])

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'aluno') { navigate('/'); return }
      setUsuario(dados)
      if (dados.turma_id) {
        try {
          const [t, atividades, entregas, listaAulas] = await Promise.all([
            getTurmaPorId(dados.turma_id),
            getAtividadesDaTurma(dados.turma_id),
            getNotasDoAluno(dados.id),
            getConteudosPorTurma(dados.turma_id),
          ])
          setTurma(t)
          setAulas(listaAulas)
          const entregasIds = new Set(entregas.map(e => e.atividade_id))
          setPendentes(atividades.filter(a => !entregasIds.has(a.id)))
          const comNota = entregas.filter(e => e.nota !== null && e.nota !== undefined)
          if (comNota.length > 0) {
            const soma = comNota.reduce((acc, e) => acc + Number(e.nota), 0)
            setMedia((soma / comNota.length).toFixed(1))
          }
        } catch {
          // segue sem dados se falhar
        }
      }
    }
    carregar()
  }, [navigate])

  if (!usuario) return null

  const primeiroNome = usuario.nome.split(' ')[0]
  const matricula    = usuario.matricula || null

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo="Aluno"
        avatarCor={avatarCores.aluno}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <TabNav abas={[
        { label: 'Início',       rota: '/dashboard/aluno'  },
        { label: 'Atividades',   rota: '/aluno/atividades' },
        { label: 'Minhas aulas', rota: '/aluno/aulas'      },
        'Chat',
      ]} />

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>
              {matricula ? `Matrícula: ${matricula}` : 'Bem-vindo ao UniSAS'}
            </p>
          </div>
          <span className={styles.bannerBadge}>
            {turma ? turma.nome : 'Aluno'}
          </span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard icon={<BsGraphUp size={16} />}     label="Média geral"  valor={media ?? '—'} sub={media ? 'Média das notas' : 'Aguardando lançamento'} cor="verde"   />
          <StatCard icon={<BsPlayCircle size={16} />}  label="Aulas disponíveis" valor={aulas.length} sub={aulas.length > 0 ? 'Publicadas pelo professor' : 'Nenhuma publicada ainda'} cor="amarelo" />
          <StatCard icon={<BsCheckCircle size={16} />} label="Frequência"   valor="—" sub="Sem registros" cor="verde" />
          <StatCard icon={<BsFilePdf size={16} />}     label="Pendentes"    valor={pendentes.length} sub={pendentes.length > 0 ? 'Atividades em aberto' : 'Nenhuma pendente'} cor="amarelo" />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}><span>Minha turma</span></div>
          {turma ? (
            <div className={styles.progressoItem} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--texto)' }}>{turma.nome}</span>
              <span style={{ fontSize: 12, color: 'var(--cinza-texto)' }}>
                {labelTurno[turma.turno] ?? turma.turno} · {turma.ano_letivo}
              </span>
            </div>
          ) : (
            <p className={styles.vazio}>Nenhuma turma atribuída.</p>
          )}
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}>
            <span>Atividades pendentes</span>
            <span className={styles.link} onClick={() => navigate('/aluno/atividades')}>Ver todas</span>
          </div>
          {pendentes.length === 0
            ? <p className={styles.vazio}>Nenhuma atividade pendente.</p>
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
          <div className={styles.listaHeader}>
            <span>Últimas aulas</span>
            <span className={styles.link} onClick={() => navigate('/aluno/aulas')}>Ver todas</span>
          </div>
          {aulas.length === 0
            ? <p className={styles.vazio}>Nenhuma aula publicada ainda.</p>
            : aulas.slice(0, 3).map(a => (
                <div key={a.id} className={styles.progressoItem} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <BsFilePdf size={14} color="var(--verde)" />
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--texto)' }}>{a.titulo}</span>
                  </div>
                  <a
                    href={a.arquivo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: 11, color: 'var(--verde)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Abrir PDF
                  </a>
                </div>
              ))
          }
        </div>

      </div>
    </div>
  )
}
