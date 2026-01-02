// // NOTE: I REFACTORED THE CODE TO USE REDUX TOOLKIT, BUT KEPT CONTEXTS FOR LEARNING PURPOSES

import { fetchUser, signIn } from "../services-with-supabase/apiUsers";

const { createContext, useState, useContext } = require("react");

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(email, password, onSuccess) {
    // const user = users.find(
    //   (u) => u.email === email && u.password === password
    // );
    // if (user) {
    //   setCurrentUser(user);
    //   setIsAuthenticated(true);
    //   if (onSuccess) onSuccess(); // like navigate("/dashboard")
    // }

    try {
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
    }
  }

  function logout() {
    setCurrentUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
