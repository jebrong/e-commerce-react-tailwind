import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProtectedRoutes() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return <Outlet></Outlet>;
  } else {
    return <Navigate to="/" />;
  }
}
