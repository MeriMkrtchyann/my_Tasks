import {  Route, Routes } from 'react-router-dom'
import {LoginPage} from "./pages/LoginPage";
import {AdminPage} from './pages/AdminPage';
import { NotExistPage } from './pages/NotExistPage';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';
import { routes } from './config/routes';
import "antd/dist/reset.css";
import { UsersPage } from './pages/UsersPage';
import { AuditsPage } from './pages/AuditsPage';

function App() {

  

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<AdminPage />} redirectTo={routes.login} />} />
      <Route path={`${routes.login}`} element={<ProtectedRoute element={`${routes.admin}`} redirectTo={<LoginPage/>} />} />
      <Route path={`${routes.admin}`} element={<ProtectedRoute element={<AdminPage />} redirectTo={routes.login} />} >
        <Route index element={<UsersPage />} />
        <Route path={`${routes.users}`} element={<UsersPage />} />
        <Route path={`${routes.audits}`} element={<AuditsPage />} />
      </Route>
      <Route path="/*" element={<NotExistPage />} />
    </Routes>
  )
}

export { App }