// // NOTE: I REFACTORED THE CODE TO USE REDUX TOOLKIT, BUT KEPT CONTEXTS FOR LEARNING PURPOSES

import { useNavigate } from "react-router-dom";

const { createContext, useState, useContext } = require("react");

// import { createContext, useContext, useState, useReducer } from "react";

// const AuthContext = createContext();

// // const initialState = { followers: 305, following: 10 };
// const initialState = {
//   followers: ["person1", "person2", "person3"],
//   following: ["person1", "person2", "person3", "person4", "person5", "person6"],
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "add_following":
//       return {
//         ...state,
//         following: [...state.following, action.payload],
//       };
//     case "delete_following":
//       return {
//         ...state,
//         following: state.following.filter(
//           (person) => person !== action.payload
//         ),
//       };
//     default:
//       throw new Error(`Unknown action type: ${action.type}`);
//   }
// }

// function AuthProvider({ children }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [state, dispatch] = useReducer(reducer, initialState);

//   async function login(email, password) {
//     try {
//       const res = await fetch(`http://localhost:3001/users?email=${email}`);
//       const data = await res.json();

//       if (data.length > 0 && data[0].password === password) {
//         setIsAuthenticated(true);
//         setUser(data[0]);
//       }
//     } catch (err) {
//       console.log("Error during login: ", err);
//       alert("Something went wrong during logging in.");
//     }
//   }

//   function logout() {
//     setIsAuthenticated(false);
//     setUser(null);
//   }

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, user, login, logout, state, dispatch }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// }

// export { AuthProvider, useAuth };

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
