import {
  Navigate,
  Outlet,
  createBrowserRouter,
  RouterProvider,
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
import { PostsProvider } from "./context/PostsContext";

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <NavBar />
      {/* Nested pages will render here */}
      <Outlet />
    </ProtectedRoute>
  );
}

const router = createBrowserRouter([
  // redirect to "/" to "/login"
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  // public route
  {
    path: "/login",
    element: <Login />,
  },
  // protected routes
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/network",
        element: <Network />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
    ],
  },
  // fallback route
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  // return (
  //   <AuthProvider>
  //     <BrowserRouter>
  //       <Routes>
  //         {/* Redirect "/" to "/login" */}
  //         <Route path="/" element={<Navigate to="/login" replace />} />

  //         {/* Public route */}
  //         <Route path="/login" element={<Login />} />

  //         {/* Protected routes */}
  //         <Route element={<ProtectedLayout />}>
  //           <Route path="/home" element={<Home />} />
  //           <Route path="/network" element={<Network />} />
  //           <Route path="/jobs" element={<Jobs />} />
  //           <Route path="/messages" element={<Messages />} />
  //           <Route path="/notifications" element={<Notifications />} />
  //         </Route>

  //         {/* Fallback */}
  //         <Route path="*" element={<NotFound />} />
  //       </Routes>
  //     </BrowserRouter>
  //   </AuthProvider>
  // );

  return (
    <AuthProvider>
      <PostsProvider>
        <RouterProvider router={router} />
      </PostsProvider>
    </AuthProvider>
  );
}
