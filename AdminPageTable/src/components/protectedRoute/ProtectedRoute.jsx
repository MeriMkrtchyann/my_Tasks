import { Navigate } from 'react-router-dom'

const ProtectedRoute = (prop) => {
  const {  element, redirectTo } = prop;
  const access_token =  localStorage.getItem("access_token")
    if ( typeof element === "string" &&  typeof redirectTo === "string"){
      return access_token ? <Navigate to={element} /> : <Navigate to={redirectTo} />;
    }
    if ( typeof element === "string" && typeof redirectTo !== "string"){
      return access_token ? <Navigate to={element} /> :redirectTo ;
    }
    if ( typeof element !== "string" && typeof redirectTo === "string"){
      return access_token ? element : <Navigate to={redirectTo}/> 
    }
    return access_token ? element : redirectTo ;
};

export { ProtectedRoute }