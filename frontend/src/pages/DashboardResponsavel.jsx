import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar   from '../components/ui/TopBar'
import StatCard from '../components/dashboard/StatCard'
import { getUsuario, getUsuarios, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import { getTurmaPorId } from '../services/turmaService'
import { getNotasDoAluno } from '../services/notaService'
import { BsPeopleFill, BsBuilding } from 'react-icons/bs'
import styles from './Dashboard.module.css'

const labelTurno = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite' }

export default function DashboardResponsavel() {
  const navigate = useNavigate()

  const [responsavel, setResponsavel] = useState(null)
  const [aluno,       setAluno]       = useState(null)
  const [turma,       setTurma]       = useState(null)
  const [notas,       setNotas]       = useState([])
  const [erro,        setErro]        = useState('')

  useEffect(() => {
    async function carregar() {
      const dados = getUsuario()
      if (!dados || dados.perfil !== 'responsavel') { navigate('/'); return }
      setResponsavel(dados)

      const codigoAluno = dados.codigo_aluno || dados.codigoAluno
      if (!codigoAluno) return

      try {
        const todos = await getUsuarios()
        const alunoEncontrado = todos.find(u => u.perfil === 'aluno' && u.matricula === codigoAluno)
        if (!alunoEncontrado) return
        setAluno(alunoEncontrado)

        const [notasDoAluno, turmaDoAluno] = await Promise.all([
          getNotasDoAluno(alunoEncontrado.id),
          alunoEncontrado.turma_id ? getTurmaPorId(alunoEncontrado.turma_id) : Promise.resolve(null),
        ])

        setNotas(notasDoAluno)
        if (turmaDoAluno) setTurma(turmaDoAluno)
      } catch {
        setErro('Erro ao carregar dados do aluno.')
      }
    }
    carregar()
  }, [navigate])

  if (!responsavel) return null

  const primeiroNome = responsavel.nome.split(' ')[0]
  const comNota      = notas.filter(n => n.nota !== null && n.nota !== undefined)
  const media        = comNota.length > 0
    ? (comNota.reduce((acc, n) => acc + Number(n.nota), 0) / comNota.length).toFixed(1)
    : null

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={responsavel.nome}
        cargo="Responsável"
        avatarCor={avatarCores.responsavel}
        avatarLetras={getIniciais(responsavel.nome)}
      />

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>
              {aluno ? `Acompanhando: ${aluno.nome}` : 'Nenhum aluno vinculado'}
            </p>
          </div>
          <span className={styles.bannerBadge}>Responsável</span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard
            icon={<BsPeopleFill size={16} />}
            label="Aluno"
            valor={aluno ? aluno.nome.split(' ')[0] : '—'}
            sub={aluno ? `Matrícula: ${aluno.matricula ?? '—'}` : 'Não vinculado'}
            cor="verde"
          />
          <StatCard
            icon={<BsBuilding size={16} />}
            label="Turma"
            valor={turma ? turma.nome : '—'}
            sub={turma ? (labelTurno[turma.turno] ?? turma.turno) : 'Sem turma'}
            cor="verde"
          />
        </div>

        {erro && <p style={{ fontSize: 13, color: '#dc2626', textAlign: 'center' }}>{erro}</p>}

        <div className={styles.listaCard}>
          <div className={styles.listaHeader}>
            <span>Notas do aluno</span>
            {media && (
              <span style={{ fontSize: 12, fontWeight: 600, color: Number(media) >= 6 ? 'var(--verde)' : '#dc2626' }}>
                Média geral: {media}
              </span>
            )}
          </div>

          {notas.length === 0 ? (
            <p className={styles.vazio}>
              {aluno ? 'Nenhuma nota registrada ainda.' : 'Nenhum aluno vinculado.'}
            </p>
          ) : (
            notas.map(n => (
              <div key={n.id} className={styles.progressoItem} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--texto)', margin: 0 }}>
                    {n.atividades?.titulo ?? 'Atividade'}
                  </p>
                  {n.data_entrega && (
                    <p style={{ fontSize: 11, color: 'var(--cinza-texto)', margin: '2px 0 0' }}>
                      {new Date(n.data_entrega).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: n.nota == null ? 'var(--cinza-texto)' : Number(n.nota) >= 6 ? 'var(--verde)' : '#dc2626',
                  }}>
                    {n.nota ?? '—'}
                  </span>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 20,
                    background: n.nota == null ? '#f1f5f9' : Number(n.nota) >= 6 ? '#dcfce7' : '#fee2e2',
                    color: n.nota == null ? '#64748b' : Number(n.nota) >= 6 ? 'var(--verde)' : '#dc2626',
                  }}>
                    {n.nota == null ? 'Aguardando' : Number(n.nota) >= 6 ? 'Aprovado' : 'Atenção'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
