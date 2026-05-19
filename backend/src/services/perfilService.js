export async function getPerfisDisponiveis() {
  return [
    { id: 'aluno',       label: 'Aluno',       descricao: 'Acesso a conteúdos e atividades' },
    { id: 'professor',   label: 'Professor',   descricao: 'Gestão de turmas e conteúdo'     },
    { id: 'responsavel', label: 'Responsável', descricao: 'Acompanhe seu filho'              },
    { id: 'diretor',     label: 'Diretor',     descricao: 'Gestão escolar completa'          },
  ]
}
