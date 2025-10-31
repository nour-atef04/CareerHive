import { createContext, useContext, useState, useReducer } from "react";

const AuthContext = createContext();

const initialState = { followers: 305, following: 10 };

function reducer(state, action) {
  switch (action.type) {
    case "add_following":
      return {
        ...state,
        following: state.following + 1,
      };
    case "delete_following":
      return {
        ...state,
        following: state.following - 1,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  async function login(email, password) {
    try {
      const res = await fetch(`http://localhost:3001/users?email=${email}`);
      const data = await res.json();

      if (data.length > 0 && data[0].password === password) {
        setIsAuthenticated(true);
        setUser(data[0]);
      }
    } catch (err) {
      console.log("Error during login: ", err);
      alert("Something went wrong during logging in.");
    }
  }

  function logout() {
    setIsAuthenticated(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, state, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
