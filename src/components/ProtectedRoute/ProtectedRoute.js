import { Navigate } from "react-router-dom";

function ProtectedRoute({ Component, ...props }) {
  if (props.isLoggedIn) {
    return <Component {...props} />;
  }
  return <Navigate to="/" />;
}

export default ProtectedRoute;
