import { Suspense } from "react";
import {
  Navigate,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";

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
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    lazy: async () => {
      const { default: Login } = await import("./pages/Login");
      return { Component: Login };
    },
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/home",
        lazy: async () => {
          const { default: Home } = await import("./pages/Home");
          return { Component: Home };
        },
      },
      {
        path: "/network",
        lazy: async () => {
          const { default: Network } = await import("./pages/Network");
          return { Component: Network };
        },
      },
      {
        path: "/jobs",
        lazy: async () => {
          const { default: Jobs } = await import("./pages/Jobs");
          return { Component: Jobs };
        },
      },
      {
        path: "/messages",
        lazy: async () => {
          const { default: Messages } = await import("./pages/Messages");
          return { Component: Messages };
        },
      },
      {
        path: "/notifications",
        lazy: async () => {
          const { default: Notifications } = await import(
            "./pages/Notifications"
          );
          return { Component: Notifications };
        },
      },
    ],
  },
  {
    path: "*",
    lazy: async () => {
      const { default: NotFound } = await import("./components/NotFound");
      return { Component: NotFound };
    },
  },
]);

export default function App() {
  // return (
  //   <AuthProvider>
  //     <PostsProvider>
  //       <Suspense fallback={<div>Loading...</div>}>
  //         <RouterProvider router={router} />
  //       </Suspense>
  //     </PostsProvider>
  //   </AuthProvider>
  // );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
