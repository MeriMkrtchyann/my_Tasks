import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateEmail } from '../redux/slices/activeUser/activeUserSlice';
import {LoginPage} from "./pages/LoginPage";
import {AdminPage} from './pages/AdminPage';
import { NotExistPage } from './pages/NotExistPage';
import "antd/dist/reset.css";
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';

function App() {

  const activeUserEmail = useSelector((state) => state.activeUser.email)
  const dispatch = useDispatch()

  useEffect(() => {
    try{
      const storedUserEmail = localStorage.getItem('activeUserEmail');
      if (storedUserEmail) {
        dispatch(updateEmail(storedUserEmail))
      }
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
        <Route index element={<ProtectedRoute isAuthenticated={activeUserEmail} element={`${routeLinks.admin}`}  redirectTo={`${routeLinks.login}`} />} />
      </Route>
        <Route path={`${routeLinks.login}`} element={<ProtectedRoute isAuthenticated={!activeUserEmail} element={<LoginPage />} redirectTo={`${routeLinks.admin}`} />} />
        <Route path={`${routeLinks.admin}`} element={<ProtectedRoute isAuthenticated={activeUserEmail} element={<AdminPage />} redirectTo={`${routeLinks.login}`} />} />
        <Route path="/*" element={<NotExistPage/>} />
    </Routes>
  )
}

export { App }