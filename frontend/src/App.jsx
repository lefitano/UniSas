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
import DownloadsPage        from  './pages/DownloadsPage' 

import FrequenciaResponsavel from './pages/FrequenciaResponsavel'
import NotasResponsavel      from './pages/NotasResponsavel'
import ChatPageResponsavel   from './pages/ChatPageResponsavel'

import MinhasTurmasProfessor  from './pages/MinhasTurmasProfessor'
import ConteudosProfessor     from './pages/ConteudosProfessor'
import BancoQuestoesProfessor from './pages/BancoQuestoesProfessor'
import ChatProfessor          from './pages/ChatProfessor'
import UploadAulaProfessor    from './pages/UploadAulaProfessor'
import NovaAtividadeProfessor from './pages/NovaAtividadeProfessor'
import CriarQuestaoProfessor  from './pages/CriarQuestaoProfessor'
import VerDesempenhoProfessor from './pages/VerDesempenhoProfessor';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                       element={<LoginPage />} />
        <Route path="/auth/:perfil"           element={<AuthPage />} />
        <Route path="/dashboard/aluno"        element={<DashboardAluno />} />
        <Route path="/dashboard/professor"    element={<DashboardProfessor />} />
        <Route path="/dashboard/responsavel"  element={<DashboardResponsavel />} />
        <Route path="/dashboard/diretor"      element={<DashboardDiretor />} />
        <Route path="/perfil/editar"                     element={<EditProfilePage />} />
        <Route path="/perfil/configuracoes"              element={<ConfiguracoesPage />} />
        <Route path="/gerenciar-usuarios"                element={<GerenciarUsuariosPage />} />
        <Route path="/gerenciar-usuarios/novo"           element={<NovoUsuarioPage />} />
        <Route path="/gerenciar-usuarios/editar/:id"     element={<EditarUsuarioPage />} />

        <Route path="/aluno/aulas"            element={<MinhasAulasPage />} />
        <Route path="/aluno/atividades"       element={<AtividadesPage />} />
        <Route path="/aluno/chat"             element={<ChatPage />} /> 
        <Route path="/aluno/downloads"        element={<DownloadsPage />} />
        
        
        <Route path="/responsavel/frequencia" element={<FrequenciaResponsavel />} />
        <Route path="/responsavel/notas"      element={<NotasResponsavel />} />
        <Route path="/responsavel/chat"       element={<ChatPageResponsavel />} />
        

        
        <Route path="/professor/minhas-turmas"  element={<MinhasTurmasProfessor />} />
        <Route path="/professor/conteudos"      element={<ConteudosProfessor />} />
        <Route path="/professor/banco-questoes" element={<BancoQuestoesProfessor />} />
        <Route path="/professor/chat"           element={<ChatProfessor />} />
        <Route path="/professor/upload-aula"    element={<UploadAulaProfessor />} />
        <Route path="/professor/nova-atividade" element={<NovaAtividadeProfessor />} />
        <Route path="/professor/criar-questao"  element={<CriarQuestaoProfessor />} />
        <Route path="/professor/desempenho"     element={<VerDesempenhoProfessor />} />
        
        <Route path="*"                        element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}