
import { Navigate } from 'react-router-dom'
import { routes } from '../../config/routes';

const GuestRoute = (prop) => {
  const { element } = prop
  const accessToken = localStorage.getItem("access_token")
  console.log(accessToken)
  return accessToken ? <Navigate to={routes.admin}/> :element 
 
};

export { GuestRoute }