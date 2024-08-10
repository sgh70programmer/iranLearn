import React, {useContext, useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import AuthContext from "../../context/authContext";
import regex from "../../validators/regex";
import swal from "sweetalert";

import "./Register.css";

export default function Register() {
  const authContext = useContext(AuthContext)
  const[name, setName] = useState("")
  const[username, setUsername] = useState("")
  const[phone, setPhone] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const navigator = useNavigate()
   


  const checkValidForm = () =>{
    if(regex.minValue(5, name) && regex.check_username(username) && regex.testPhoneNumber(phone) && regex.testEmail(email) && regex.testPassword(password)){
      return false
    }else{
      return true
    }
  }


  const registerNewUser = (event) => {
    event.preventDefault()
    
      const newUserInfos = {
        name,
        username,
        email,
        phone,
        password,
        confirmPassword: password,
      };
      fetch("http://localhost:4000/v1/auth/register",
        {
          method: "post", headers: { "content-type": "application/json" }
          , body: JSON.stringify(newUserInfos)
        })
        .then(res => {
          if(res.ok){
           res.json()
            .then(result => {
              swal({
                title: 'با موفقیت ثبت نام کردید',
                icon: 'success',
                button: 'اوکی'
              })
              authContext.login(result.user, result.accessToken)
              navigator("/")
              

            })
          }else if(res.status == 403){
            swal({
              title: 'این شماره تماس مسدود شده',
              icon: 'error',
              button: 'ای بابا'
            })
          }
          
        })
        
    }

 
  return (
    <div>
      <Topbar/>
      <Navbar />
      
      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ساخت حساب کاربری</span>
          <span className="login__subtitle">خوشحالیم قراره به جمع ما بپیوندی</span>
          <div className="login__new-member">
            <span className="login__new-member-text">قبلا ثبت‌نام کرده‌اید؟ </span>
            <Link className="login__new-member-link" to="/login">
              وارد شوید
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <input
                className={`login-form__username-input ${(regex.minValue(5, name))? "success":"error"}`}
                type="text"
                placeholder="نام و نام خانوادگی"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                }}
               
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <input
                className={`login-form__username-input ${regex.check_username(username) ? "success":"error"}`}
                type="text"
                placeholder="نام کاربری"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__username">
              <input
                className={`login-form__username-input ${regex.testPhoneNumber(phone) ? "success":"error"}`}
                type="text"
                placeholder="شماره تماس"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value)
                }}
                
              />
              <i className="login-form__username-icon fa fa-phone"></i>
            </div>
            <div className="login-form__password">
              <input
                className={`login-form__username-input ${regex.testEmail(email) ? "success":"error"}`}
                type="email"
                placeholder="آدرس ایمیل"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
                
              />
              <i className="login-form__password-icon fa fa-envelope"></i>
            </div>
            <div className="login-form__password">
              <input
                className={`login-form__username-input ${regex.testPassword(password) ? "success":"error"}`}
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
               
              />
           
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <button className={`login-form__btn ${!checkValidForm()
                ? "login-form__btn-success"
                : "login-form__btn-error"
              }`} type="submit" onClick={registerNewUser} disabled={checkValidForm()}>
              <i className="login-form__btn-icon fa fa-user-plus"></i>
              <span className="login-form__btn-text">عضویت</span>
            </button>

          </form>
          <div className="login__des">
            <span className="login__des-title">سلام کاربر محترم:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                لطفا از مرورگر های مطمئن و بروز مانند گوگل کروم و فایرفاکس
                استفاده کنید.
              </li>
              <li className="login__des-item">
                ما هرگز اطلاعات محرمانه شمارا از طریق ایمیل درخواست نمیکنیم.
              </li>
              <li className="login__des-item">
                لطفا کلمه عبور خود را در فواصل زمانی کوتاه تغییر دهید.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
