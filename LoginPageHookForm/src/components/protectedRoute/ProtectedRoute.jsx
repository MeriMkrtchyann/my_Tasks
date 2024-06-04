import { Navigate } from 'react-router-dom'

const ProtectedRoute = (prop) => {
    const { isAuthenticated, element, redirectTo } = prop;
    if ( typeof element === "string" ){
      console.log(1)
      return isAuthenticated ? <Navigate to={element} /> : <Navigate to={redirectTo} />;
    }
    console.log(2)
    return isAuthenticated ? element : <Navigate to={redirectTo} />;
};

export { ProtectedRoute }