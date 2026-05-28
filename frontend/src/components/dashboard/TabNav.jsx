import { useLocation, useNavigate } from 'react-router-dom'
import styles from './TabNav.module.css'

const rotasPorAba = {
 
  'Minhas aulas': '/aluno/aulas',
  'Atividades': '/aluno/atividades',
  'Downloads': '/aluno/downloads',

  
  'Painel geral': '/dashboard/diretor',
  'Turmas': null,
  'Professores': null,
  'Alunos': null,
  'Relatórios': null,

  'Acompanhamento': '/dashboard/responsavel',
  'Frequência': '/responsavel/frequencia',
  'Notas': '/responsavel/notas',
  'Chat com escola': '/responsavel/chat',

  'Minhas turmas': '/professor/minhas-turmas',
  'Conteúdos': '/professor/conteudos',
  'Banco de questões': '/professor/banco-questoes',
}

export default function TabNav({ abas }) {
  const navigate = useNavigate()
  const location = useLocation() 

  function obterRota(aba) {
    const path = location.pathname

    if (aba === 'Início') {
      if (path.includes('/professor')) return '/dashboard/professor'
      return '/dashboard/aluno' 
    }

    if (aba === 'Chat') {
      if (path.includes('/professor')) return '/professor/chat' 
      return '/aluno/chat' 
    }

    return rotasPorAba[aba]
  }

  function handleNavegar(aba) {
    const rota = obterRota(aba)
    
    if (rota) {
      navigate(rota)
    } else {
      console.log(`A aba "${aba}" ainda não possui uma tela criada.`)
    }
  }

  return (
    <div className={styles.tabs}>
      {abas.map((t) => {
        const rotaDoBotao = obterRota(t)
        let isAtiva = rotaDoBotao === location.pathname
        
        
        const subPaginasConteudos = ['/professor/upload-aula', '/professor/nova-atividade']
        if (subPaginasConteudos.includes(location.pathname) && t === 'Conteúdos') {
          isAtiva = true
        }

       
        if (location.pathname === '/professor/criar-questao' && t === 'Banco de questões') {
          isAtiva = true
        }

        
        if (location.pathname === '/professor/desempenho' && t === 'Início') {
          isAtiva = true
        }

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