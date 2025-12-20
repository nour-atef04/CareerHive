// // NOTE: I REFACTORED THE CODE TO USE REDUX TOOLKIT, BUT KEPT CONTEXTS FOR LEARNING PURPOSES

const { createContext, useState, useContext } = require("react");

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(email, password, users, onSuccess) {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      if (onSuccess) onSuccess(); // like navigate("/dashboard")
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
