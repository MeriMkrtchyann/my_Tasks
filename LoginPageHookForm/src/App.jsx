import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import LoginPage from "./pages/LoginPage";
import AdminPage from './pages/AdminPage';
import "antd/dist/reset.css";
import { updateEmail } from '../redux/slices/activeUser/activeUserSlice';

export default function App() {

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


  const ProtectedRoute = (prop) => {
    const { isAuthenticated, element, redirectTo } = prop;
    if ( typeof element === "string" ){
      console.log(1)
      return isAuthenticated ? <Navigate to={element} /> : <Navigate to={redirectTo} />;
    }
    console.log(2)
    return isAuthenticated ? element : <Navigate to={redirectTo} />;
  };


  return (
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute isAuthenticated={activeUserEmail} element="/admin"  redirectTo="/login" />} />
      </Route>
        <Route path="/login" element={<ProtectedRoute isAuthenticated={!activeUserEmail} element={<LoginPage />} redirectTo="/admin" />} />
        <Route path="/admin" element={<ProtectedRoute isAuthenticated={activeUserEmail} element={<AdminPage />} redirectTo="/login" />} />
    </Routes>
  )
}
