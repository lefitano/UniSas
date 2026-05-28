import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'


const notasMock = [

  { id: 1, disciplina: 'Matemática', bim1: 8.5, bim2: 9.0, bim3: '-', bim4: '-', media: 8.8 },
  { id: 2, disciplina: 'Português',  bim1: 7.0, bim2: 6.5, bim3: '-', bim4: '-', media: 6.8 },
  { id: 3, disciplina: 'Ciências',   bim1: 9.5, bim2: 9.0, bim3: '-', bim4: '-', media: 9.3 },
  { id: 4, disciplina: 'História',   bim1: 5.5, bim2: 6.0, bim3: '-', bim4: '-', media: 5.8 },
]


const getCorNota = (nota) => {

  if (nota === '-') return '#94A3B8' 
  const valor = parseFloat(nota)
  if (valor >= 8.0) return '#10B981' 
  if (valor >= 6.0) return '#F59E0B' 
  return '#EF4444'                  
}


export default function NotasResponsavel() {

  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)


  useEffect(() => {

    const dados = getUsuario()
    if (!dados || dados.perfil !== 'responsavel') { navigate('/'); return }
    setUsuario(dados)
  }, [navigate])

  if (!usuario) return null

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
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#1E293B', fontWeight: '700' }}>
            Notas e Desempenho
          </h1>
          <p style={{ margin: 0, color: '#64748B', fontSize: '15px' }}>
            Acompanhe as avaliações e médias do aluno.
          </p>
        </div>
       
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '16px 8px', color: '#64748B', fontSize: '14px', fontWeight: '600' }}>Disciplina</th>
                <th style={{ padding: '16px 8px', color: '#64748B', fontSize: '14px', fontWeight: '600' }}>1º Bim</th>
                <th style={{ padding: '16px 8px', color: '#64748B', fontSize: '14px', fontWeight: '600' }}>2º Bim</th>
                <th style={{ padding: '16px 8px', color: '#64748B', fontSize: '14px', fontWeight: '600' }}>3º Bim</th>
                <th style={{ padding: '16px 8px', color: '#64748B', fontSize: '14px', fontWeight: '600' }}>4º Bim</th>
                <th style={{ padding: '16px 8px', color: '#64748B', fontSize: '14px', fontWeight: '600' }}>Média Final</th>
              </tr>
            </thead>

            <tbody>

              {notasMock.map((linha, index) => (
                <tr key={linha.id} style={{ borderBottom: index === notasMock.length - 1 ? 'none' : '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 8px', color: '#1E293B', fontSize: '15px', fontWeight: '600' }}>{linha.disciplina}</td>
                  <td style={{ padding: '16px 8px', color: getCorNota(linha.bim1), fontSize: '15px', fontWeight: '700' }}>{linha.bim1}</td>
                  <td style={{ padding: '16px 8px', color: getCorNota(linha.bim2), fontSize: '15px', fontWeight: '700' }}>{linha.bim2}</td>
                  <td style={{ padding: '16px 8px', color: getCorNota(linha.bim3), fontSize: '15px', fontWeight: '700' }}>{linha.bim3}</td>
                  <td style={{ padding: '16px 8px', color: getCorNota(linha.bim4), fontSize: '15px', fontWeight: '700' }}>{linha.bim4}</td>
                  <td style={{ padding: '16px 8px', color: getCorNota(linha.media), fontSize: '15px', fontWeight: '800' }}>{linha.media}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 