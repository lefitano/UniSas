import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'

const disciplinasMock = [
  { id: 1, nome: 'Matemática', professor: 'Carlos Lima', progresso: 45, cor: '#2D7A3A' },
  { id: 2, nome: 'Português', professor: 'Ana Souza', progresso: 80, cor: '#854F0B' },
  { id: 3, nome: 'Ciências', professor: 'João Silva', progresso: 20, cor: '#185FA5' },
  { id: 4, nome: 'Geográfia', professor: 'Gergo barros', progresso: 50, cor: '#9518a5' }  
]

export default function MinhasAulasPage() {
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

      <div className={styles.corpo}>
        <div className={styles.banner}>
          <div>
            <p className={styles.bannerTitulo}>Suas Disciplinas 📚</p>
            <p className={styles.bannerSub}>Continue de onde parou!</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {disciplinasMock.map(disc => (
            <div key={disc.id} style={{
              background: '#fff', borderRadius: '14px', padding: '16px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', 
              alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <div style={{ 
                   width: '42px', height: '42px', borderRadius: '10px', 
                   background: disc.cor, display: 'flex', alignItems: 'center', 
                   justifyContent: 'center', color: '#fff', fontWeight: 'bold', 
                   fontFamily: 'var(--fonte-display)', fontSize: '16px'
                 }}>
                   {disc.nome.charAt(0)}
                 </div>
                 <div>
                   <p style={{ margin: 0, fontWeight: 600, fontSize: '15px', color: 'var(--texto)' }}>{disc.nome}</p>
                   <p style={{ margin: 0, fontSize: '12px', color: 'var(--cinza-texto)' }}>Prof. {disc.professor}</p>
                 </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--verde)' }}>{disc.progresso}% concluído</span>
                <div style={{ width: '80px', height: '6px', background: 'var(--cinza-bg)', borderRadius: '4px', marginTop: '4px', overflow: 'hidden' }}>
                   <div style={{ width: `${disc.progresso}%`, height: '100%', background: 'var(--verde)' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}