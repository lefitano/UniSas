import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { getToken }              from './services/api'
import { getUsuario }            from './services/usuarioService'
import LoginPage                 from './pages/LoginPage'
import AuthPage                  from './pages/AuthPage'
import DashboardAluno            from './pages/DashboardAluno'
import DashboardProfessor        from './pages/DashboardProfessor'
import DashboardResponsavel      from './pages/DashboardResponsavel'
import DashboardDiretor          from './pages/DashboardDiretor'
import EditProfilePage           from './pages/EditProfilePage'
import ConfiguracoesPage         from './pages/ConfiguracoesPage'
import GerenciarUsuariosPage     from './pages/GerenciarUsuariosPage'
import NovoUsuarioPage           from './pages/NovoUsuarioPage'
import EditarUsuarioPage         from './pages/EditarUsuarioPage'
import GerenciarTurmasPage       from './pages/GerenciarTurmasPage'
import NovoTurmaPage             from './pages/NovoTurmaPage'
import EditarTurmaPage           from './pages/EditarTurmaPage'
import ListarAlunosPage          from './pages/ListaAlunosPage'
import ListaProfessoresPage      from './pages/ListaProfessoresPage'
import MinhasTurmasPage          from './pages/MinhasTurmasPage'
import DetalhesTurmaPage         from './pages/DetalhesTurmaPage'
import AlunosDaTurmaPage         from './pages/AlunosDaTurmaPage'
import GerenciarAtividadesPage   from './pages/GerenciarAtividadesPage'
import NovaAtividadePage         from './pages/NovaAtividadePage'

function RotaProtegida({ perfil, children }) {
  const token   = getToken()
  const usuario = getUsuario()

  if (!token || !usuario) {
    return <Navigate to="/" replace />
  }

  if (perfil && usuario.perfil !== perfil) {
    return <Navigate to={`/dashboard/${usuario.perfil}`} replace />
  }

  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"            element={<LoginPage />} />
        <Route path="/auth/:perfil" element={<AuthPage />} />

        <Route path="/dashboard/aluno"       element={<RotaProtegida perfil="aluno">       <DashboardAluno />       </RotaProtegida>} />
        <Route path="/dashboard/professor"   element={<RotaProtegida perfil="professor">   <DashboardProfessor />   </RotaProtegida>} />
        <Route path="/dashboard/responsavel" element={<RotaProtegida perfil="responsavel"> <DashboardResponsavel /> </RotaProtegida>} />
        <Route path="/dashboard/diretor"     element={<RotaProtegida perfil="diretor">     <DashboardDiretor />     </RotaProtegida>} />

        <Route path="/perfil/editar"       element={<RotaProtegida> <EditProfilePage />       </RotaProtegida>} />
        <Route path="/perfil/configuracoes" element={<RotaProtegida> <ConfiguracoesPage />    </RotaProtegida>} />

        <Route path="/gerenciar-usuarios"            element={<RotaProtegida perfil="diretor"> <GerenciarUsuariosPage /> </RotaProtegida>} />
        <Route path="/gerenciar-usuarios/novo"       element={<RotaProtegida perfil="diretor"> <NovoUsuarioPage />       </RotaProtegida>} />
        <Route path="/gerenciar-usuarios/editar/:id" element={<RotaProtegida perfil="diretor"> <EditarUsuarioPage />     </RotaProtegida>} />

        <Route path="/gerenciar-turmas"            element={<RotaProtegida perfil="diretor"> <GerenciarTurmasPage /> </RotaProtegida>} />
        <Route path="/gerenciar-turmas/novo"       element={<RotaProtegida perfil="diretor"> <NovoTurmaPage />       </RotaProtegida>} />
        <Route path="/gerenciar-turmas/editar/:id" element={<RotaProtegida perfil="diretor"> <EditarTurmaPage />     </RotaProtegida>} />
        <Route path="/gerenciar-turmas/:id"        element={<RotaProtegida perfil="diretor"> <DetalhesTurmaPage />   </RotaProtegida>} />


        <Route path="/diretor/alunos"      element={<RotaProtegida perfil="diretor">    <ListarAlunosPage />      </RotaProtegida>} />
        <Route path="/diretor/professores" element={<RotaProtegida perfil="diretor">    <ListaProfessoresPage /> </RotaProtegida>} />
        <Route path="/professor/turmas"          element={<RotaProtegida perfil="professor"> <MinhasTurmasPage />          </RotaProtegida>} />
        <Route path="/professor/turmas/:id"      element={<RotaProtegida perfil="professor"> <AlunosDaTurmaPage />         </RotaProtegida>} />
        <Route path="/professor/atividades"      element={<RotaProtegida perfil="professor"> <GerenciarAtividadesPage />   </RotaProtegida>} />
        <Route path="/professor/atividades/nova" element={<RotaProtegida perfil="professor"> <NovaAtividadePage />          </RotaProtegida>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
