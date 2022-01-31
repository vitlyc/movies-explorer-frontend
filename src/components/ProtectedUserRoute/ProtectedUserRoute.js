import { Navigate } from "react-router-dom";

function ProtectedUserRoute({ Component, ...props }) {
  if (!props.isLoggedIn) {
    return <Component {...props} />;
  }
  return <Navigate to="/" />;
}

export default ProtectedUserRoute;
