import React, {useContext, useState} from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import regex from "../../validators/regex";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import "./Contact.css";

export default function Contact() {
  const[name, setName] = useState("")
  const[phone, setPhone] = useState("")
  const[email, setEmail] = useState("")
  const[body, setBody] = useState("")
  const navigate = useNavigate();

  const checkValidForm = () =>{
    if(regex.minValue(5, name) &&  regex.testPhoneNumber(phone) && regex.testEmail(email) && regex.minValue(10, body)){
      return false
    }else{
      return true
    }
  }



  const addNewContact = (event) => {
    event.preventDefault()
    const newContactInfo = {
      name,
      email,
      phone,
      body,
    };

    fetch("http://localhost:4000/v1/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContactInfo),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "پیغام شما با موفقیت به مدیران سایت ارسال شد",
          icon: "success",
          buttons: "اوکی",
        }).then((value) => {
          navigate("/");
        });
      }
    });

  };
  return (
    <div>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login register-form">
          <span className="login__title">ارتباط با ما</span>
          <span className="login__subtitle">
            نظر یا انتقادتو بنویس برامون :)
          </span>
          <form action="#" className="login-form">
            <div className="login-form__username login-form__parent">
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
            <div className="login-form__password login-form__parent">
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
            <div className="login-form__phone-number login-form__parent">
              <input
                className={`login-form__username-input ${regex.testPhoneNumber(phone) ? "success":"error"}`}
                type="text"
                placeholder="شماره تماس"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value)
                }}
                
              />
              <i className="login-form__password-icon fa fa-phone"></i>
            </div>
            <div className="login-form__text login-form__parent">
              <textarea
                className={`login-form__text-input ${regex.minValue(10, body) ? "success":"error"}`}
                placeholder="متن خود را وارد کنید"
                value={body}
                onChange={(event) => setBody(event.target.value)}
              />
            </div>
            <button
              className={`login-form__btn ${!checkValidForm()
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
                }`}
              type="submit"
              onClick={addNewContact}
              disabled={checkValidForm()}
            >
              <span className="login-form__btn-text">ارسال</span>
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
