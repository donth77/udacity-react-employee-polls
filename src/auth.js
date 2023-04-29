import { createContext, useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "./actions/authUser";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "./utils/hooks";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (user, path) => {
    dispatch(setAuthUser(user));
    window.localStorage.setItem("user", user);
    setUser(user);
    navigate(path ?? "/");
  };

  const logout = () => {
    dispatch(setAuthUser(null));
    window.localStorage.setItem("user", null);
    setUser(null);
    navigate("/login", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
