import { Suspense } from "react";
import {
  Navigate,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        path: "/jobs/:jobId",
        lazy: async () => {
          const { default: JobDetailsPage } = await import(
            "./pages/JobDetailsPage"
          );
          return { Component: JobDetailsPage };
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
        path: "/messages/:chatPersonId",
        lazy: async () => {
          const { default: Messages } = await import("./pages/Messages");
          return { Component: Messages };
        },
      },
      {
        path: "/profile/:userId",
        lazy: async () => {
          const { default: Profile } = await import("./pages/Profile");
          return { Component: Profile };
        },
      },
      { path: "/profile", element: <Navigate to="/profile/me" replace /> },
    ],
  },
  {
    path: "*",
    lazy: async () => {
      const { default: NotFound } = await import("./pages/NotFound");
      return { Component: NotFound };
    },
  },
]);

// SETTING UP REACT QUERY
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
}
