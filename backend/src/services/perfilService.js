export async function getPerfisDisponiveis() {
  return [
    { id: 'ALUNO',       label: 'Aluno',       descricao: 'Acesso a conteúdos e atividades' },
    { id: 'PROFESSOR',   label: 'Professor',   descricao: 'Gestão de turmas e conteúdo'     },
    { id: 'RESPONSAVEL', label: 'Responsável', descricao: 'Acompanhe seu filho'              },
    { id: 'DIRETOR',     label: 'Diretor',     descricao: 'Gestão escolar completa'          },
  ]
}
