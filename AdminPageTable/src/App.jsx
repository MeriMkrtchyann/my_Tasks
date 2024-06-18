import {  Route, Routes } from 'react-router-dom'
import {LoginPage} from "./pages/LoginPage";
import {AdminPage} from './pages/AdminPage';
import { NotExistPage } from './pages/NotExistPage';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';
import { routes } from './config/routes';
import { UsersPage } from './pages/UsersPage';
import { AuditsPage } from './pages/AuditsPage';
import { GuestRoute } from './components/guestRoute/GuestRoute';
import "antd/dist/reset.css";
import { UserDetails } from './pages/UserDetails';
import { AdminDetails } from './pages/AdminDetails';

function App() {

  return (
    <Routes>
      <Route 
        path="/" 
        element={<ProtectedRoute element={<AdminPage />} redirectTo={routes.login}/>} 
      />
      <Route
				path={routes.login}
				element={<GuestRoute element={<LoginPage/>}/>}
			/>
      <Route path={`${routes.admin}`} element={<ProtectedRoute element={<AdminPage />}/>} >
        <Route index element={<UsersPage />} />
        <Route path={`${routes.users}`} element={<UsersPage />} />
        <Route path={`${routes.details}`} element={<UserDetails />} />
        <Route path={`${routes.audits}`} element={<AuditsPage />} />
        <Route path={`${routes.adminDetails}`} element={<AdminDetails />} />
      </Route>
      <Route path="/*" element={<NotExistPage />} />
    </Routes>
  )
}

export { App }