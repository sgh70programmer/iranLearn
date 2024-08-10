import React, {useContext} from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/AdminPanel/Sidebar/Sidebar";
import Topbar from "../../Components/AdminPanel/Topbar/Topbar";
import AuthContext from "../../context/authContext"
import { useNavigate } from 'react-router-dom'
import './index.css'

export default function IndexAdmin() {
  const authContext = useContext(AuthContext)
 
  return (
    <div>
      <div id="content">
        <Sidebar />
        <div id="home" className="col-10">
          <Topbar />
          <div className="container-fluid" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
      
    </div>
  );
}
