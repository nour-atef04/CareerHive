import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// import { useSelector } from "react-redux";
// import { getIsAuthenticated } from "../redux/slices/authSlice";

export default function ProtectedRoute({ children }) {
  // const isAuthenticated = useSelector(getIsAuthenticated);
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}
