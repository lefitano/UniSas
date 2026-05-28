import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'


const UploadIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
const PdfIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
const VideoIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
const OptionsIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>


const conteudosMock = [
  { id: 1, titulo: 'Equações do 2º Grau - Teoria', tipo: 'pdf', turmas: '9º Ano A, 9º Ano B', data: '10 Mai 2026', status: 'Publicado' },
  { id: 2, titulo: 'Videoaula: Resolução de Bhaskara', tipo: 'video', turmas: '9º Ano A, 9º Ano B', data: '12 Mai 2026', status: 'Publicado' },
  { id: 3, titulo: 'Lista de Exercícios - Geometria', tipo: 'pdf', turmas: '1º Ano B', data: '18 Mai 2026', status: 'Rascunho' },
]

const getStatusStyle = (status) => {
  if (status === 'Publicado') return { bg: '#D1FAE5', text: '#059669' } // Verde
  if (status === 'Rascunho') return { bg: '#F1F5F9', text: '#64748B' } // Cinza
  return { bg: '#FEF3C7', text: '#D97706' } // Laranja (Agendado)
}

export default function ConteudosProfessor() {
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
        abaAtiva="Conteúdos" 
      />

      <div className={styles.corpo} style={{ padding: '24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#1E293B', fontWeight: '700' }}>
              Meus Conteúdos
            </h1>
            <p style={{ margin: 0, color: '#64748B', fontSize: '15px' }}>
              Gerencie os materiais de apoio e aulas das suas turmas.
            </p>
          </div>
          
          <button 
            onClick={() => alert('Abrir modal de upload')}
            style={{ background: '#6B52A3', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.2s' }}
          >
            <UploadIcon /> Novo Conteúdo
          </button>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr auto', gap: '16px', color: '#64748B', fontSize: '13px', fontWeight: '600' }}>
            <span>NOME DO MATERIAL</span>
            <span>TURMAS VINCULADAS</span>
            <span>DATA</span>
            <span>STATUS</span>
            <span style={{ width: '24px' }}></span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {conteudosMock.map((conteudo, index) => {
              const isLast = index === conteudosMock.length - 1
              const statusStyle = getStatusStyle(conteudo.status)

              return (
                <div key={conteudo.id} style={{ padding: '16px 24px', borderBottom: isLast ? 'none' : '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr auto', gap: '16px', alignItems: 'center' }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {conteudo.tipo === 'pdf' ? <PdfIcon /> : <VideoIcon />}
                    </div>
                    <span style={{ fontSize: '15px', color: '#1E293B', fontWeight: '600' }}>{conteudo.titulo}</span>
                  </div>
                  <span style={{ fontSize: '14px', color: '#475569' }}>{conteudo.turmas}</span>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>{conteudo.data}</span>

                  <div>
                    <span style={{ background: statusStyle.bg, color: statusStyle.text, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                      {conteudo.status}
                    </span>
                  </div>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
                    <OptionsIcon />
                  </button>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}