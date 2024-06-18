import { Navigate } from 'react-router-dom'
import { routes } from '../../config/routes';

const ProtectedRoute = (prop) => {
  const { element } = prop
  const accessToken = localStorage.getItem("access_token")
  return accessToken ? element : <Navigate to={routes.login}/>
};

export { ProtectedRoute }