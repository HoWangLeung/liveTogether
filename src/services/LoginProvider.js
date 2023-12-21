import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth from "../services/Auth";
const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetail, setUserDetail] = useState({});
 

  useEffect(() => {
    fetchUser();

    return () => {};
  }, []);

  const fetchUser = async () => {
    
    let token = await AsyncStorage.getItem("accessToken");
    if (token) {
      let data = await Auth.getUserProfile(token);
      
      
      setUserDetail(data);
      setIsLoggedIn(true);
    }
  };

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userDetail, setUserDetail,fetchUser }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
