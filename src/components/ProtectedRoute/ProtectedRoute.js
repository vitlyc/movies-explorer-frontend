import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ Component, ...props }) {
  const location = useLocation();

  if (
    props.isLoggedIn &&
    (location.pathname == "/signin" || location.pathname == "/signup")
  ) {
    return <Navigate to="/" />;
  } else if (props.isLoggedIn) {
    return <Component {...props} />;
  } else if (
    !props.isLoggedIn &&
    (location.pathname == "/signin" || location.pathname == "/signup")
  ) {
    return <Component {...props} />;
  } else return <Navigate to="/" />;
}

export default ProtectedRoute;
