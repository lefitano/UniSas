import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage            from './pages/LoginPage'
import DashboardAluno       from './pages/DashboardAluno'
import DashboardProfessor   from './pages/DashboardProfessor'
import DashboardResponsavel from './pages/DashboardResponsavel'
import DashboardDiretor     from './pages/DashboardDiretor'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                       element={<LoginPage />} />
        <Route path="/dashboard/aluno"        element={<DashboardAluno />} />
        <Route path="/dashboard/professor"    element={<DashboardProfessor />} />
        <Route path="/dashboard/responsavel"  element={<DashboardResponsavel />} />
        <Route path="/dashboard/diretor"      element={<DashboardDiretor />} />
        <Route path="*"                       element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
