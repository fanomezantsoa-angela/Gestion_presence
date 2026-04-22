import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminUser from './pages/AdminUser';
import LoginPage from './pages/LoginPage'
import Home from './pages/Home';
import Layout from './components/Layout';
import RoleManagement from './pages/RoleManagement';
import StudentDirectory from './pages/StudentDirectory';
import GroupManagement from './pages/GroupManagement';
import SessionManagement from './pages/SessionManagement';
import AgendaPage from './pages/AgendaPage';
import FeuillePresence from './pages/FeuillePresence';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="admin/utilisateurs" element={<AdminUser />} />
          <Route path="roles" element={<RoleManagement />} />
          <Route path="student" element={<StudentDirectory />} />
          <Route path="group" element={<GroupManagement />} />
          <Route path="session" element={<SessionManagement />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="feuille-presence" element={<FeuillePresence />}/>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;