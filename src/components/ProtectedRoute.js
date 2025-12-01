import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../redux/slices/authSlice";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" replace />;
}
