import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";
import NotFound from "./components/NotFound";
import Network from "./pages/Network";
import Jobs from "./pages/Jobs";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <NavBar />
      {/* Nested pages will render here */}
      <Outlet />
    </ProtectedRoute>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect "/" to "/login" */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/home" element={<Home />}/>
            <Route path="/network" element={<Network />}/>
            <Route path="/jobs" element={<Jobs />}/>
            <Route path="/messages" element={<Messages />}/>
            <Route path="/notifications" element={<Notifications />}/>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
