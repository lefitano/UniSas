import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'


const ChamadaIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15L11 17L15 13"></path></svg>
const NotasIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
const AlunosIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>


const turmasMock = [
  { id: 1, nome: '9º Ano A', turno: 'Matutino', alunos: 32, media: 8.2, proximaAula: 'Hoje, 08:00' },
  { id: 2, nome: '1º Ano B', turno: 'Vespertino', alunos: 28, media: 7.5, proximaAula: 'Amanhã, 14:00' },
  { id: 3, nome: '3º Ano A', turno: 'Matutino', alunos: 35, media: 8.8, proximaAula: 'Qua, 10:00' },
]

export default function MinhasTurmasProfessor() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  const disciplina = usuario.disciplina || 'Professor'

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo={`Professor · ${disciplina}`}
        avatarCor={avatarCores.professor}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <TabNav 
        abas={['Início', 'Minhas turmas', 'Conteúdos', 'Banco de questões', 'Chat']} 
        abaAtiva="Minhas turmas" 
      />

      <div className={styles.corpo} style={{ padding: '24px 0' }}>
        
        
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#1E293B', fontWeight: '700' }}>
            Minhas Turmas
          </h1>
          <p style={{ margin: 0, color: '#64748B', fontSize: '15px' }}>
            Gerencie os alunos, frequências e notas das suas classes.
          </p>
        </div>

        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {turmasMock.map((turma) => (
            <div key={turma.id} style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', color: '#1E293B', fontWeight: '700' }}>{turma.nome}</h2>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>{turma.alunos} alunos matriculados</span>
                </div>
                <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '12px' }}>
                  {turma.turno}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '24px', padding: '16px 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748B', fontWeight: '500' }}>MÉDIA GERAL</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#10B981', fontWeight: '700' }}>{turma.media}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '12px', color: '#64748B', fontWeight: '500' }}>PRÓXIMA AULA</p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: '#1E293B', fontWeight: '600' }}>{turma.proximaAula}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button 
                  onClick={() => alert(`Fazer chamada: ${turma.nome}`)}
                  style={{ width: '100%', background: '#6B52A3', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: '0.2s' }}
                >
                  <ChamadaIcon /> Fazer Chamada
                </button>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => alert(`Lançar notas: ${turma.nome}`)}
                    style={{ flex: 1, background: '#F8FAFC', color: '#334155', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <NotasIcon /> Notas
                  </button>
                  <button 
                    onClick={() => alert(`Ver alunos: ${turma.nome}`)}
                    style={{ flex: 1, background: '#F8FAFC', color: '#334155', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <AlunosIcon /> Alunos
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}