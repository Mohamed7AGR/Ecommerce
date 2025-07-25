import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export let authContext = createContext();
export default function AuthContextProvider({ children }) {
  const [userLogin, setUserLogin] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(function () {
    if (localStorage.getItem("userToken") !== null) {
      setUserLogin(localStorage.getItem("userToken"));
    }
  }, []);
function decryptUserToken(){
  const res=jwtDecode(userLogin);
setUserData(res)
console.log(res.id);

}
useEffect(function(){
  if(userLogin){
    decryptUserToken()
  }
},[userLogin])
  return (
    <>
      <authContext.Provider value={{ userLogin, setUserLogin ,userData}}>
        {children}
      </authContext.Provider>
    </>
  );
}
