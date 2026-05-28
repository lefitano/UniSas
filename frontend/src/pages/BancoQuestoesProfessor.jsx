import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar        from '../components/ui/TopBar'
import TabNav        from '../components/dashboard/TabNav'
import { getUsuario, getIniciais, avatarCores } from '../utils/usuario'
import styles from './Dashboard.module.css'


const PlusIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
const FilterIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
const EditIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>


const questoesMock = [
  { id: 1, enunciado: 'Calcule as raízes da equação x² - 5x + 6 = 0.', topico: 'Equação 2º Grau', tipo: 'Múltipla escolha', dificuldade: 'Fácil' },
  { id: 2, enunciado: 'Determine a área de um triângulo equilátero cujo lado mede 8 cm.', topico: 'Geometria Plana', tipo: 'Discursiva', dificuldade: 'Médio' },
  { id: 3, enunciado: 'Um capital de R$ 2.000,00 aplicado a juros compostos...', topico: 'Matemática Financeira', tipo: 'Múltipla escolha', dificuldade: 'Difícil' },
  { id: 4, enunciado: 'Assinale a alternativa que apresenta uma fração equivalente a 3/4.', topico: 'Frações', tipo: 'Múltipla escolha', dificuldade: 'Fácil' },
]

const getDificuldadeStyle = (dificuldade) => {
  if (dificuldade === 'Fácil') return { bg: '#D1FAE5', text: '#059669' } // Verde
  if (dificuldade === 'Médio') return { bg: '#FEF3C7', text: '#D97706' } // Laranja
  return { bg: '#FEE2E2', text: '#DC2626' } // Vermelho
}

export default function BancoQuestoesProfessor() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [busca, setBusca] = useState('')

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
        abaAtiva="Banco de questões" 
      />

      <div className={styles.corpo} style={{ padding: '24px 0' }}>
        
       
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#1E293B', fontWeight: '700' }}>
              Banco de Questões
            </h1>
            <p style={{ margin: 0, color: '#64748B', fontSize: '15px' }}>
              Crie e organize questões para montar provas e atividades.
            </p>
          </div>
          
          <button 
            onClick={() => alert('Nova questão')}
            style={{ background: '#6B52A3', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: '0.2s' }}
          >
            <PlusIcon /> Nova Questão
          </button>
        </div>

        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', left: '16px', display: 'flex' }}><SearchIcon /></div>
            <input 
              type="text" 
              placeholder="Buscar por enunciado ou palavra-chave..." 
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '15px', color: '#1E293B', outline: 'none' }}
            />
          </div>
          <button style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '0 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#475569', fontWeight: '600' }}>
            <FilterIcon /> Filtros
          </button>
        </div>

        
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '3fr 1.5fr 1.5fr 1fr auto', gap: '16px', color: '#64748B', fontSize: '13px', fontWeight: '600' }}>
            <span>ENUNCIADO</span>
            <span>TÓPICO</span>
            <span>TIPO</span>
            <span>DIFICULDADE</span>
            <span style={{ width: '32px' }}></span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {questoesMock.map((q, index) => {
              const isLast = index === questoesMock.length - 1
              const difStyle = getDificuldadeStyle(q.dificuldade)

              return (
                <div key={q.id} style={{ padding: '20px 24px', borderBottom: isLast ? 'none' : '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '3fr 1.5fr 1.5fr 1fr auto', gap: '16px', alignItems: 'center' }}>
                  
                  <span style={{ fontSize: '15px', color: '#1E293B', fontWeight: '500', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {q.enunciado}
                  </span>

                  <span style={{ fontSize: '14px', color: '#475569', background: '#F1F5F9', padding: '4px 10px', borderRadius: '8px', display: 'inline-block', width: 'fit-content' }}>
                    {q.topico}
                  </span>

                  <span style={{ fontSize: '14px', color: '#64748B' }}>{q.tipo}</span>

                  <div>
                    <span style={{ background: difStyle.bg, color: difStyle.text, padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '700' }}>
                      {q.dificuldade}
                    </span>
                  </div>

                  <button style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', cursor: 'pointer', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <EditIcon />
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