import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import dashStyles from './Dashboard.module.css'
import styles from './Gerenciar.module.css'


const alunosMock = [
  { id: 1, nome: 'Ana Beatriz Souza', matricula: '2024001', media: 8.5, entregas: '100%', status: 'Excelente' },
  { id: 2, nome: 'Carlos Eduardo Lima', matricula: '2024002', media: 5.0, entregas: '60%', status: 'Atenção' },
  { id: 3, nome: 'Mariana Silva Costa', matricula: '2024003', media: 9.2, entregas: '100%', status: 'Excelente' },
  { id: 4, nome: 'João Pedro Alves', matricula: '2024004', media: 6.8, entregas: '80%', status: 'Regular' },
]

export default function VerDesempenhoProfessor() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [turmaSelecionada, setTurmaSelecionada] = useState('9a')

  useEffect(() => {
    const dados = getUsuario()
    if (!dados || dados.perfil !== 'professor') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null
  const disciplina = usuario.disciplina || 'Professor'

  const getStatusCor = (status) => {
    if (status === 'Excelente') return '#22C55E' 
    if (status === 'Regular') return '#F59E0B'   
    return '#EF4444'                             
  }

  return (
    <div className={dashStyles.pagina}>
      <TopBar
        nome={usuario.nome}
        cargo={`Professor · ${disciplina}`}
        avatarCor={avatarCores.professor}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <div className={dashStyles.corpo}>
        
        
        <div className={styles.cabecalho}>
          <div>
            <button className={styles.btnVoltar} onClick={() => navigate(-1)}>
              ← Voltar
            </button>
            <h1 className={styles.titulo}>Desempenho das Turmas</h1>
          </div>
        </div>

        
        <div className={styles.formCard} style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div className={styles.campo} style={{ flex: 1, margin: 0 }}>
              <label className={styles.label}>Turma</label>
              <select 
                className={styles.select} 
                value={turmaSelecionada}
                onChange={(e) => setTurmaSelecionada(e.target.value)}
              >
                <option value="9a">9º Ano A</option>
                <option value="1b">1º Ano B - Ensino Médio</option>
              </select>
            </div>
            <div className={styles.campo} style={{ flex: 1, margin: 0 }}>
              <label className={styles.label}>Período</label>
              <select className={styles.select}>
                <option value="1tri">1º Trimestre</option>
                <option value="2tri">2º Trimestre</option>
                <option value="geral">Visão Geral (Anual)</option>
              </select>
            </div>
          </div>
        </div>

       
        <div className={styles.formCard}>
          <h2 style={{ fontSize: '18px', color: '#0F172A', marginBottom: '16px' }}>
            Visão Detalhada dos Alunos
          </h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#64748B', fontSize: '14px' }}>
                  <th style={{ padding: '12px 8px' }}>Aluno</th>
                  <th style={{ padding: '12px 8px' }}>Matrícula</th>
                  <th style={{ padding: '12px 8px' }}>Média Atual</th>
                  <th style={{ padding: '12px 8px' }}>Entregas</th>
                  <th style={{ padding: '12px 8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {alunosMock.map((aluno) => (
                  <tr key={aluno.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '16px 8px', color: '#1E293B', fontWeight: '500' }}>{aluno.nome}</td>
                    <td style={{ padding: '16px 8px', color: '#64748B' }}>{aluno.matricula}</td>
                    <td style={{ padding: '16px 8px', color: '#0F172A', fontWeight: 'bold' }}>{aluno.media.toFixed(1)}</td>
                    <td style={{ padding: '16px 8px', color: '#64748B' }}>{aluno.entregas}</td>
                    <td style={{ padding: '16px 8px' }}>
                      <span style={{ 
                        background: `${getStatusCor(aluno.status)}20`, 
                        color: getStatusCor(aluno.status), 
                        padding: '6px 12px', 
                        borderRadius: '9999px',
                        fontSize: '13px',
                        fontWeight: '600'
                      }}>
                        {aluno.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}