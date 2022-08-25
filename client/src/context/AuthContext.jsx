import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const isAuthenticated = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (typeof token !== "undefined" && token !== null) {
      try {
        const { data, status } = await axios.get(
          "http://localhost:3000/api/v1/auth/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (status === 200) {
          login(data.user);
        }
      } catch (err) {
        localStorage.clear("token");
        navigate("/");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
