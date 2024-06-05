import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { updateEmail } from '../redux/slices/activeUser/activeUserSlice';
import {LoginPage} from "./pages/LoginPage";
import {AdminPage} from './pages/AdminPage';
import { NotExistPage } from './pages/NotExistPage';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';
import "antd/dist/reset.css";
import axios from 'axios';
import { updateUserInfo } from '../redux/slices/activeUser/activeUserSlice';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    try{
      (async function () {
        const token = localStorage.getItem('access_token');
        if (token) {
          const response = await axios.get('/api/admin/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          dispatch(updateUserInfo(response.data))
        }
      })()
     
    }catch(err){
      console.log(err)
    }
  },[dispatch]);

  const routeLinks = {
    login : "/login",
    admin : "/admin"
  }

  return (
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute element={`${routeLinks.admin}`}  redirectTo={`${routeLinks.login}`} />} />
      </Route>
        <Route path={`${routeLinks.login}`} element={<ProtectedRoute element={`${routeLinks.admin}`} redirectTo={<LoginPage/>} />} />
        <Route path={`${routeLinks.admin}`} element={<ProtectedRoute element={<AdminPage />} redirectTo={`${routeLinks.login}`} />} />
        <Route path="/*" element={<NotExistPage/>} />
    </Routes>
  )
}

export { App }