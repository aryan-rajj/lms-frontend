import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequiredAuth = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state?.auth);
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/denied" replace />;
  }

  return <Outlet />;
};

export default RequiredAuth;
