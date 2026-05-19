import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage            from './pages/LoginPage'
import AuthPage             from './pages/AuthPage'
import DashboardAluno       from './pages/DashboardAluno'
import DashboardProfessor   from './pages/DashboardProfessor'
import DashboardResponsavel from './pages/DashboardResponsavel'
import DashboardDiretor     from './pages/DashboardDiretor'
import EditProfilePage      from './pages/EditProfilePage'
import ConfiguracoesPage    from './pages/ConfiguracoesPage'
import GerenciarUsuariosPage from './pages/GerenciarUsuariosPage'
import NovoUsuarioPage      from './pages/NovoUsuarioPage'
import EditarUsuarioPage    from './pages/EditarUsuarioPage'
import MinhasAulasPage      from './pages/MinhasAulasPage'
import AtividadesPage       from './pages/AtividadesPage'
import ChatPage             from './pages/ChatPage'
import DownloadsPage from './pages/DownloadsPage' 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                       element={<LoginPage />} />
        <Route path="/auth/:perfil"           element={<AuthPage />} />
        <Route path="/dashboard/aluno"        element={<DashboardAluno />} />
        <Route path="/aluno/aulas"            element={<MinhasAulasPage />} />
        <Route path="/aluno/atividades"       element={<AtividadesPage />} />
        <Route path="/aluno/chat"             element={<ChatPage />} /> 
        <Route path="/dashboard/professor"    element={<DashboardProfessor />} />
        <Route path="/dashboard/responsavel"  element={<DashboardResponsavel />} />
        <Route path="/dashboard/diretor"      element={<DashboardDiretor />} />
        <Route path="/perfil/editar"                     element={<EditProfilePage />} />
        <Route path="/perfil/configuracoes"              element={<ConfiguracoesPage />} />
        <Route path="/gerenciar-usuarios"                element={<GerenciarUsuariosPage />} />
        <Route path="/gerenciar-usuarios/novo"           element={<NovoUsuarioPage />} />
        <Route path="/gerenciar-usuarios/editar/:id"     element={<EditarUsuarioPage />} />
        <Route path="/aluno/downloads"        element={<DownloadsPage />} />
        <Route path="*"                                  element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  )
}