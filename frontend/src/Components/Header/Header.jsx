import React, { useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Topbar from "../Topbar/Topbar";
import Landing from "../Landing/Landing"
import AuthContext from "../../context/authContext";

import "./Header.css";

export default function Header() {
  const authContext = useContext(AuthContext)
  useEffect(() =>{
    authContext.getAllInfos()
  }, [])

  return (
    <header className="header">
        <Topbar  />
        <Navbar />
        <Landing info={authContext.indexInfo} />
    </header>
  );
}
