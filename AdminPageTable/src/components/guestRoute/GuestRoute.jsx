import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { selectAccessToken } from '../../../redux/slices/activeAdmin/activeAdminSlice';
import { routes } from '../../config/routes';

const GuestRoute = (prop) => {
  const { element } = prop
  const accessToken = useSelector(selectAccessToken)

  return accessToken ? <Navigate to={routes.admin}/> :element 
 
};

export { GuestRoute }