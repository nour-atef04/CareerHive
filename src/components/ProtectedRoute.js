import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./ui/Loader";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  // while checking session, show loader
  if (isLoading) {
    return <Loader />;
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
}
