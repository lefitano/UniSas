import { useLocation, useNavigate } from 'react-router-dom'
import styles from './TabNav.module.css'


const rotasPorAba = {
  'Início': '/dashboard/aluno',
  'Minhas aulas': '/aluno/aulas',
  'Atividades': '/aluno/atividades',
  'Chat': '/aluno/chat', 
  'Downloads': '/aluno/downloads',

  'Painel geral': '/dashboard/diretor',
  'Turmas': null,
  'Professores': null,
  'Alunos': null,
  'Relatórios': null,

  'Acompanhamento': '/dashboard/responsavel',
  'Frequência': null,
  'Notas': null,
  'Chat com escola': null,

  'Minhas turmas': '/dashboard/professor', 
  'Conteúdos': null,
  'Banco de questões': null,
}

// Barra de nav no topo dos dashboards
export default function TabNav({ abas }) {
  const navigate = useNavigate()
  const location = useLocation() 

  function handleNavegar(aba) {
    const rota = rotasPorAba[aba]
    
    
    if (rota) {
      navigate(rota)
    } else {
      console.log(`A aba "${aba}" ainda não possui uma tela criada.`)
    }
  }

  return (
    <div className={styles.tabs}>
      {abas.map((t) => {
        const isAtiva = rotasPorAba[t] === location.pathname

        return (
          <span 
            key={t} 
            className={`${styles.tab} ${isAtiva ? styles.tabAtiva : ''}`}
            onClick={() => handleNavegar(t)}
            style={{ cursor: 'pointer' }}
          >
            {t}
          </span>
        )
      })}
    </div>
  )
}