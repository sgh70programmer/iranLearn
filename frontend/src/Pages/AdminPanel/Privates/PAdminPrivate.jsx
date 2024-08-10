import React from 'react'
import {  Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux';


export default function PAdminPrivate({ children }) {

  const { isLoading, isLogin, user } = useSelector(state => state.user)

  return (
    <div>
      {isLoading ? <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border  text-primary mt-5" style={{width:"5rem", height:"5rem"}} role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div> :
        (isLogin && user.role === "ADMIN") ? children : <Navigate to={"/login"} />
      }
    </div>
  )

 


}
