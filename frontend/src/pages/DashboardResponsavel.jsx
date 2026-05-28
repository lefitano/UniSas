import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import StatCard      from '../components/dashboard/StatCard'
import { getUsuario, getIniciais, getSaudacao, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
)

const notasRecentesMock = [
  { id: 1, disciplina: 'Matemática', avaliacao: 'Prova do 1º Bimestre', nota: 8.5, data: '15 Mai' },
  { id: 2, disciplina: 'Português', avaliacao: 'Trabalho prático', nota: 7.0, data: '12 Mai' },
  { id: 3, disciplina: 'História', avaliacao: 'Atividade avaliativa', nota: 6.5, data: '10 Mai' },
]

const getCorBadgeNota = (nota) => {
  if (nota >= 8.0) return { bg: '#D1FAE5', text: '#059669' } 
  if (nota >= 7.0) return { bg: '#FEF3C7', text: '#D97706' } 
  return { bg: '#FEE2E2', text: '#DC2626' }                  
}

const mensagensRecentesMock = [
  { 
    id: 1, 
    remetente: 'Coordenação', 
    msg: 'Reunião de pais amanhã às 19h...', 
    hora: 'Ontem', 
    cor: '#E0F2FE', 
    textoCor: '#0284C7' 
  },
  { 
    id: 2, 
    remetente: 'Profª. Cláudia', 
    msg: 'O aluno teve um ótimo desempenho...', 
    hora: '14:30', 
    cor: '#FEF3C7', 
    textoCor: '#D97706' 
  },
]

export default function DashboardResponsavel() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'responsavel') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  const primeiroNome = usuario.nome.split(' ')[0]

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo="Responsável"
        avatarCor={avatarCores.responsavel}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <TabNav abas={['Acompanhamento', 'Frequência', 'Notas', 'Chat com escola']} />

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>{getSaudacao()}, {primeiroNome}! 👋</p>
            <p className={styles.bannerSub}>Acompanhe o desempenho do seu filho</p>
          </div>
          <span className={styles.bannerBadge}>Responsável</span>
        </div>

        <div className={styles.cardsGrid}>
          <StatCard icon="📊" label="Média geral"          valor="—"  sub="Sem dados ainda"       cor="verde"   />
          <StatCard icon="✅" label="Frequência"            valor="—"  sub="Sem registros"         cor="verde"   />
          <StatCard icon="📝" label="Atividades pendentes" valor="0"  sub="Nenhuma pendente"      cor="amarelo" />
          <StatCard icon="🏆" label="Conquistas"            valor="0"  sub="Nenhuma ainda"         cor="verde"   />
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Notas recentes</span>
            <span style={{ fontSize: '14px', color: '#3B82F6', cursor: 'pointer', fontWeight: '600' }} onClick={() => navigate('/responsavel/notas')}>Ver histórico</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            {notasRecentesMock.map((nota, index) => {
              const cor = getCorBadgeNota(nota.nota)
              return (
                <div key={nota.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: index === notasRecentesMock.length - 1 ? '0' : '16px', borderBottom: index === notasRecentesMock.length - 1 ? 'none' : '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileIcon />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1E293B' }}>{nota.disciplina}</p>
                      <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>{nota.avaliacao}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span style={{ background: cor.bg, color: cor.text, padding: '4px 10px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>{nota.nota.toFixed(1)}</span>
                    <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '500' }}>{nota.data}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className={styles.listaCard}>
          <div className={styles.listaHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Mensagens recentes</span>
            <span style={{ fontSize: '14px', color: '#3B82F6', cursor: 'pointer', fontWeight: '600' }} onClick={() => navigate('/responsavel/chat')}>Ver chat</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            {mensagensRecentesMock.map((msg, index) => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: index === mensagensRecentesMock.length - 1 ? '0' : '16px', borderBottom: index === mensagensRecentesMock.length - 1 ? 'none' : '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: msg.cor, color: msg.textoCor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '15px' }}>
                    {getIniciais(msg.remetente)}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#1E293B' }}>{msg.remetente}</p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#64748B' }}>{msg.msg}</p>
                  </div>
                </div>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '500', marginTop: '2px' }}>{msg.hora}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}