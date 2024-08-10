import React, { useState, useEffect, useCallback } from "react";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import AuthContext from "./context/authContext";
import './App.css'
import { useDispatch } from "react-redux";
import { setLogin, setUser } from "./redux/user/usersSlice";



export default function App() {
  let router = useRoutes(routes)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [userInfos, setUserInfos] = useState({});
  const [indexInfo, setIndexInfo] = useState({})
  const dispatch = useDispatch()
  
  

  const login = useCallback((userInfos, token) => {
    setToken(token)
    setIsLoggedIn(true)
    setUserInfos(userInfos)
    localStorage.setItem('user', JSON.stringify({ token }))
  }, [token])

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    localStorage.removeItem('user')
  }, [token])

const getAllInfos = () =>{
  fetch('http://localhost:4000/v1/infos/index')
    .then(res => res.json())
    .then(allInfos => {
      setIndexInfo(allInfos)
    })
}

  useEffect(() => {
  
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    if (localStorageData) {
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
         
          setIsLoggedIn(true);
          setUserInfos(userData);
          dispatch(setUser(userData))
          dispatch(setLogin(true))
        });
    }else{
      setIsLoggedIn(false)
      dispatch(setLogin(false))
    }
  },[login, logout]);

  return (
    <div>
     
      <AuthContext.Provider value={{isLoggedIn, token, userInfos,  login, logout, indexInfo, getAllInfos, emptyInput, setEmptyInput}}>
        {router}
      </AuthContext.Provider>
    </div>
    

  );
}
