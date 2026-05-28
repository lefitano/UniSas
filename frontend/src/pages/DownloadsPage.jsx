import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'


const downloadsMock = [
  { id: 1, titulo: 'Apostila de Matemática - Capítulo 3', detalhes: '2.5 MB • Baixado em 20/04/2026' },
  { id: 2, titulo: 'Vídeo: Fotossíntese', detalhes: '45 MB • Baixado em 18/04/2026' },
  { id: 3, titulo: 'Exercícios de Português', detalhes: '1.2 MB • Baixado em 15/04/2026' },
  { id: 4, titulo: 'Mapa: Brasil Político', detalhes: '8 MB • Baixado em 12/04/2026' },
]


const DownloadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)

export default function DownloadsPage() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'aluno') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

  return (
    <div className={styles.pagina}>
      <TopBar
        nome={usuario.nome || 'Aluno'}
        cargo="Aluno"
        avatarCor={avatarCores.aluno}
        avatarLetras={getIniciais(usuario.nome || 'A')}
        xp="340"
      />

      <TabNav abas={['Início', 'Minhas aulas', 'Atividades', 'Chat', 'Downloads']} />

   
      <div style={{ width: '100%', padding: '32px', boxSizing: 'border-box' }}>
        
        
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700', color: '#1E293B' }}>
          Conteúdos disponíveis offline
        </h2>


      
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {downloadsMock.map((item) => (
            <div 
              key={item.id} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', 
                padding: '16px 24px', 
                background: '#FFFFFF',
                borderRadius: '16px', 
                border: '1px solid #E2E8F0', 
                transition: '0.2s',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
            >
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ 
                  width: '56px', height: '56px', 
                  background: '#EFF6FF', 
                  borderRadius: '12px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <DownloadIcon />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600', color: '#1E293B' }}>
                    {item.titulo}
                  </h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                    {item.detalhes}
                  </p>
                </div>
              </div>

             
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#059669', 
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  padding: '8px',
                  transition: '0.2s',
                  flexShrink: 0
                }}
                onMouseOver={(e) => e.target.style.opacity = '0.7'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
                onClick={() => alert(`Abrindo o arquivo: ${item.titulo}`)}
              >
                Abrir
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}