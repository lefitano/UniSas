import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'

// Dados simulados baseados no Figma fornecido
const atividadesMock = [
  { id: 1, disciplina: 'Matemática', descricao: 'Lista de Exercícios: Equações do 2º Grau', tag: 'Urgente', corTag: 'vermelho' },
  { id: 2, disciplina: 'Português', descricao: 'Redação: O Impacto da Tecnologia', tag: 'No prazo', corTag: 'amarelo' },
  { id: 3, disciplina: 'Ciências', descricao: 'Relatório do Experimento de Biologia', tag: 'No prazo', corTag: 'amarelo' }
]

export default function AtividadesPage() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const alunoXP = "340" // Defini o XP aqui em uma variável para usar na TopBar e no Banner ao mesmo tempo

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
        xp={alunoXP}
      />

      <TabNav abas={['Início', 'Minhas aulas', 'Atividades', 'Chat', 'Downloads']} />

      <div className={styles.corpo}>
        
        {/* Cabeçalho da Seção */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', color: 'var(--texto)', fontWeight: '700' }}>
            Atividades
          </h1>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--cinza-texto)' }}>
            Você tem {atividadesMock.length} atividades pendentes
          </p>
        </div>

        {/* Banner de XP - IGUAL AO FIGMA */}
        <div style={{ 
          background: '#F4F0FF', 
          borderRadius: '16px', 
          padding: '16px 20px', 
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', 
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', height: '40px', background: '#FFD700', 
              borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', flexShrink: 0
            }}>
              ⚡
            </div>
            <div>
              <p style={{ margin: 0,尊重: '700', color: '#4A308E', fontSize: '15px', fontWeight: '700' }}>Continue assim!</p>
              <p style={{ margin: 0, color: '#6B52A3', fontSize: '13px', marginTop: '2px' }}>Continue completando atividades para ganhar mais XP!</p>
            </div>
          </div>
          
          {/* Mostrador de XP do lado direito do banner */}
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '24px', fontWeight: '800', color: '#4A308E', display: 'block', lineHeight: '1' }}>
              {alunoXP}
            </span>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#6B52A3', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              XP Total
            </span>
          </div>
        </div>

        {/* Lista de Atividades "Para hoje" */}
        <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0', color: 'var(--texto)' }}>
          Para hoje
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {atividadesMock.map(atv => (
            <div key={atv.id} style={{
              background: '#fff', borderRadius: '16px', padding: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex',
              alignItems: 'center', gap: '14px', cursor: 'pointer'
            }}>
              
              {/* Ícone da Disciplina */}
              <div style={{ 
                width: '48px', height: '48px', background: '#F0F4F8', 
                borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', flexShrink: 0
              }}>
                📄
              </div>

              {/* Textos */}
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '15px', color: 'var(--texto)' }}>
                  {atv.disciplina}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--cinza-texto)' }}>
                  {atv.descricao}
                </p>
              </div>

              {/* Tag de Status */}
              <div>
                <span style={{
                  fontSize: '10px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px',
                  background: atv.corTag === 'vermelho' ? '#FFEBEB' : '#FFF9E6',
                  color: atv.corTag === 'vermelho' ? '#DC3545' : '#B8860B',
                  textTransform: 'uppercase', letterSpacing: '0.5px'
                }}>
                  {atv.tag}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}