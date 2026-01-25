// // NOTE: I REFACTORED THE CODE TO USE REDUX TOOLKIT, BUT KEPT CONTEXTS FOR LEARNING PURPOSES

import toast from "react-hot-toast";
import {
  fetchUser,
  getCurrentUser,
  signIn,
} from "../services-with-supabase/apiUsers";
import { useUser } from "../hooks/useUsers";

const { createContext, useState, useContext, useEffect } = require("react");

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // loading state to prevent immediate redirect
  const [isLoading, setIsLoading] = useState(true);

  // check session on MOUNT
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser();
        if (user?.id) {
          // get the user object
          const profile = await fetchUser(user.id);

          if (profile) {
            setCurrentUser({ ...profile, id: user.id });
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Auth check failed", error);
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function login(email, password, onSuccess) {
    try {
      setIsLoading(true);
      const authUser = await signIn(email, password);
      const profile = await fetchUser(authUser.id);

      setCurrentUser({
        ...profile,
        id: authUser.id,
      });

      setIsAuthenticated(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err.message);
      toast.error("Login failed.");
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    // TO DO: CALL SUPABASE.AUTH.SIGNOUT() HERE
    setCurrentUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
