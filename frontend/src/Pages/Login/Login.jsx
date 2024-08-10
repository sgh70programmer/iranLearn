import React, { useContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import AuthContext from "../../context/authContext";
import regex from "../../validators/regex";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css";

export default function Login() {
  const authContext = useContext(AuthContext)
  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const [isGoogleRecaptchaVerify, setIsGoogleRecaptchaVerify] = useState(false)
  const navigate = useNavigate()
 

  
 

  const userLogin = (event) => {
    event.preventDefault()
    const userData = {
      identifier: username,
      password
    };
    fetch("http://localhost:4000/v1/auth/login", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData)
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then((text) => { throw new Error(text); })

        } else {
          return res.json();
        }
      })
      .then(result => {
        swal({
          title: "با موفقیت لاگین شدید",
          icon: "success",
          button: "ورود به پنل",
        }).then(value => {
          navigate('/')
        })
        authContext.login({}, result.accessToken)
      })
      .catch((error) => {
        swal({
          title: "همچین کاربری وجود ندارد",
          icon: "error",
          button: "تلاش دوباره",
        });

      })
  }

  const onChangeHandler = () => {
    setIsGoogleRecaptchaVerify(true)
  }

  const checkValidForm = () =>{
    if((regex.check_username(username)  || regex.testEmail(username)) && regex.testPassword(password)){
      return false
    }else{
      return true
    }
  }

  return (
    <div>
      <Topbar  />
      <Navbar />

      <section className="login-register">
        <div className="login">
          <span className="login__title">ورود به حساب کاربری</span>
          <span className="login__subtitle">
            خوشحالیم دوباره میبینیمت دوست عزیز :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">کاربر جدید هستید؟</span>
            <Link className="login__new-member-link" to="/register">
              ثبت نام
            </Link>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <input
                element="input"
                className={`login-form__username-input ${(regex.check_username(username) || regex.testEmail(username)) ? "success":"error"}`}
                type="text"
                placeholder="نام کاربری یا آدرس ایمیل"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              
              />
              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <input
                element="input"
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
            <div className="login-form__password recaptcha-parent">
              <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChangeHandler} />
            </div>
            <button className={`login-form__btn ${
              (!checkValidForm() && isGoogleRecaptchaVerify)
                ? "login-form__btn-success"
                : "login-form__btn-error"
              }`} type="submit" onClick={userLogin} disabled={!(!checkValidForm() && isGoogleRecaptchaVerify)}>
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
              <span className="login-form__btn-text">ورود</span>
            </button>

            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input className="login-form__password-checkbox" type="checkbox" />
                <span className="login-form__password-text">
                  مرا به خاطر داشته باش
                </span>
              </label>
              <label className="login-form__password-forget">
                <a className="login-form__password-forget-link" href="#">
                  رمز عبور را فراموش کرده اید؟
                </a>
              </label>
            </div>
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
