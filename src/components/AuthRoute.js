import { Navigate } from "react-router-dom";
import { useAuth } from "../auth";

export const AuthRoute = ({ path, children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/login"} state={{ path }} />; // not logged in, navigate to login
  }
  return children;
};
