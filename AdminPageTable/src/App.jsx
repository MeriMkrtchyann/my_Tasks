import { useEffect } from 'react';
import {  Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {LoginPage} from "./pages/LoginPage";
import {AdminPage} from './pages/AdminPage';
import { NotExistPage } from './pages/NotExistPage';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';
import { getData } from './api/getData';
import { urls } from './config/urls';
import { routes } from './config/routes';
import "antd/dist/reset.css";
import { updateAdminInfo } from '../redux/slices/activeAdmin/activeAdminSlice';
import { updateUsersInfo } from '../redux/slices/usersInfo/usersInfoSlice';
import { UsersPage } from './pages/UsersPage';
import { AuditsPage } from './pages/AuditsPage';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    try{
      (async function () {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const adminData = await getData(urls.aboutAdmin)
          const usersData = await getData(urls.aboutUsers)
          dispatch(updateAdminInfo(adminData))
          dispatch(updateUsersInfo(usersData))
        }
      })()
     
    }catch(err){
      console.log(err)
    }
  },[dispatch]);


  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute element={<AdminPage />} redirectTo={routes.login} />} />
      <Route path={`${routes.login}`} element={<ProtectedRoute element={`${routes.admin}`} redirectTo={<LoginPage/>} />} />
      <Route path={routes.admin} element={<ProtectedRoute element={<AdminPage />} redirectTo={routes.login} />} >
        <Route index element={<UsersPage />} />
        <Route path={`${routes.users}`} element={<UsersPage />} />
        <Route path={`${routes.audits}`} element={<AuditsPage />} />
      </Route>
      <Route path="/*" element={<NotExistPage />} />
    </Routes>
  )
}

export { App }