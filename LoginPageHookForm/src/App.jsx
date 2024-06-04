import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateEmail } from '../redux/slices/activUser/activUserSlice';
import LoginPage from "./pages/LoginPage";
import AdminPage from './pages/AdminPage';
import "antd/dist/reset.css";

export default function App() {

  const activUserEmail = useSelector((state) => state.activUser.email)
  const dispatch = useDispatch()

  useEffect(() => {
    try{
      const storedUserEmail = localStorage.getItem('activUserEmail');
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
      return isAuthenticated ? <Navigate to={element} /> : <Navigate to={redirectTo} />;
    }
    return isAuthenticated ? element : <Navigate to={redirectTo} />;
  };


  return (
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute isAuthenticated={activUserEmail} element="/admin"  redirectTo="/login" />} />
      </Route>
        <Route path="/login" element={<ProtectedRoute isAuthenticated={!activUserEmail} element={<LoginPage />} redirectTo="/admin" />} />
        <Route path="/admin" element={<ProtectedRoute isAuthenticated={activUserEmail} element={<AdminPage />} redirectTo="/login" />} />
    </Routes>
  )
}
