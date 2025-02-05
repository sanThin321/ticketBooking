import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = token ? `Bearer ${token}` : "";
  const [id, setId] = useState(null);
  const [user, setUser] = useState({});

  const storeToken = (userDetails) => {
    localStorage.setItem("token", userDetails.token);
    localStorage.setItem("agencyId", userDetails.id);
    setId(userDetails.id);
    setToken(userDetails.token);
    setIsLoggedIn(!!userDetails.token);
  };

  const getUser = async () => {
    const id = localStorage.getItem("agencyId");
    try {
      const res = await axios.get(
        `http://localhost:4004/pelrizhabtho/profile/${id}`
      );
      if (res.status === 200) {
        setUser(res.data.user);
        console.log("User:", res.data.user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logout successful.");
    setIsLoggedIn(false);
  };

  const refreshUser = () => {
    getUser();
  }

  useEffect(() => {
    getUser()
    if (token) {
      
    } else {
      setIsLoading(false);
    }
    console.log(user);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        authorizationToken,
        isLoggedIn,
        LogoutUser,
        isLoading,
        user,
        id,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);
  if (!AuthContextValue) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return AuthContextValue;
};
