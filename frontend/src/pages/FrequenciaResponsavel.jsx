import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'


const frequenciaMock = [
  { id: 1, disciplina: 'Matemática', assistidas: 38, total: 40 },
  { id: 2, disciplina: 'Português',  assistidas: 37, total: 40 },
  { id: 3, disciplina: 'História',   assistidas: 39, total: 40 },
  { id: 4, disciplina: 'Geografia',  assistidas: 36, total: 40 },
  { id: 5, disciplina: 'Ciências',   assistidas: 38, total: 40 },
]

export default function FrequenciaResponsavel() {
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
        cargo="Responsável · Ana Souza"
        avatarCor={avatarCores.responsavel}
        avatarLetras={getIniciais(usuario.nome)}
      />

      <TabNav abas={['Acompanhamento', 'Frequência', 'Notas', 'Chat com escola']} abaAtiva="Frequência" />

      <div className={styles.corpo} style={{ padding: '24px 0' }}>
        
        
        <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
          <h2 style={{ fontSize: '20px', color: '#0F172A', marginBottom: '36px', fontWeight: '600', marginTop: 0 }}>
            Frequência por disciplina
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {frequenciaMock.map((item) => {
             
              const porcentagem = (item.assistidas / item.total) * 100;
                   
              const porcentagemFormatada = Number.isInteger(porcentagem) 
                ? porcentagem 
                : porcentagem.toFixed(1);

              const isGreen = porcentagem >= 95;
              const corBarra = isGreen ? '#00B050' : '#D97706'; 

              return (
                <div key={item.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#334155', fontSize: '14px' }}>
                    <span>{item.disciplina}</span>
                    <span style={{ color: '#64748B' }}>
                      {item.assistidas}/{item.total} aulas · {porcentagemFormatada}%
                    </span>
                  </div>
                  
                 
                  <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${porcentagem}%`,
                        background: corBarra,
                        borderRadius: '4px',
                        transition: 'width 0.5s ease-in-out'
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}