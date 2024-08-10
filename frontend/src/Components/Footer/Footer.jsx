import React, {useState} from "react";
import FooterItem from "../FooterItem/FooterItem";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import regex from "../../validators/regex";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("")
  const [inputFocus, setInputFocus]= useState(false)

  const checkValidForm = () =>{
    if( regex.testEmail(email)){
      return false
    }else{
      return true
    }
  }

  const addNewEmail = (event) => {
    event.preventDefault();
    const newEmail = {
      email,
    };

    fetch("http://localhost:4000/v1/newsletters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmail),
    }).then((res) => {

      if (res.ok) {
        swal({
          title: "ایمیل شما با موفقیت در خبرنامه ثبت شد",
          icon: "success",
          buttons: "خیلی هم عالی",
        })
      }
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-widgets">
          <div className="row">
            <FooterItem title="درباره ما">
              <p className="footer-widgets__text">
                وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که
                در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل
                قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی و
                فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی کنم!
                و خب امروز آکادمی آموزش برنامه نویسی ایران لرن به عنوان یک آکادمی
                خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی اجازه تدریس
                در اون رو نداره و باید از فیلترینگ های خاص آکادمی ایران لرن رد شه!
                این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با
                دانشجو بسیار مهمه! ما در آکادمی ایران لرن تضمین پشتیبانی خوب و با
                کیفیت رو به شما میدیم . چرا که مدرسین وب سایت سبزلرن حتی برای
                پشتیبانی دوره های رایگان شون هم هزینه دریافت میکنند و متعهد
                هستند که هوای کاربر های عزیز رو داشته باشند !
              </p>
            </FooterItem>

            <FooterItem title="آخرین مطالب">
              <div className="footer-widgets__links">
                <a href="#" className="footer-widgets__link">
                  نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                </a>
                <a href="#" className="footer-widgets__link">
                  چگونه پایتون را آپدیت کنیم؟ | آموزش صفر تا صد آپدیت کردن
                  پایتون
                </a>
                <a href="#" className="footer-widgets__link">
                  آموزش نصب پایتون ( Python ) در در مک، ویندوز و لینوکس | گام به
                  گام و تصویری
                </a>
                <a href="#" className="footer-widgets__link">
                  بهترین فریم ورک های فرانت اند | 16 فریم ورک Front end بررسی
                  معایب و مزایا
                </a>
                <a href="#" className="footer-widgets__link">
                  معرفی بهترین سایت آموزش جاوا اسکریپت [ تجربه محور ] + آموزش
                  رایگان
                </a>
              </div>
            </FooterItem>

            <FooterItem title="دسترسی سریع">
              <div className="row">
                <div className="col-6">
                  <a href="#" className="footer-widgets__link">
                    آموزش HTML
                  </a>
                </div>

                <div className="col-6">
                  <a href="#" className="footer-widgets__link">
                    آموزش CSS
                  </a>
                </div>

                <div className="col-6">
                  <a href="#" className="footer-widgets__link">
                    آموزش جاوا اسکریپت
                  </a>
                </div>
                <div className="col-6">
                  <a href="#" className="footer-widgets__link">
                    آموزش بوت استرپ
                  </a>
                </div>
                <div className="col-6">
                  <a href="#" className="footer-widgets__link">
                    آموزش ریکت
                  </a>
                </div>

                <div className="col-6">
                  <a href="#" className="footer-widgets__link">
                    آموزش پایتون
                  </a>
                </div>
                <div className="col-6">
                  <Link to="/contact" className="footer-widgets__link">
                    ارتباط با ما
                  </Link>
                </div>
                <div className="col-12">
                  <span className="footer-widgets__title">اشتراک در خبرنامه</span>
                  <span className="footer-widgets__text text-center d-block">
                    جهت اطلاع از آخرین اخبار و تخفیف های سایت مشترک شوید!
                  </span>
                  <form action="#" className="footer-widgets__form">
                    <input
                      type="email"
                      className={`login-form__username-input ${inputFocus && (regex.testEmail(email) ? "success":"error")}`}
                      placeholder="ایمیل خود را وارد کنید."
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                      }}
                      onFocus={() => setInputFocus(true)}
                      onBlur={() => setInputFocus(false)}
                    />
                    <button
                    style={{height:"46px", marginRight:"2px"}}
                      type="submit"
                      className={`footer-widgets__btn ${inputFocus && (!checkValidForm()? "login-form__btn-success"
                        : "login-form__btn-error")}`}
                      onClick={addNewEmail}
                      disabled={checkValidForm()}
                    >
                      عضویت
                    </button>
                  </form>
                </div>
              </div>
            </FooterItem>
          </div>
        </div>
      </div>

      <div className="footer__copyright">
        <span className="footer__copyright-text">
          کلیه حقوق برای آکادمی آموزش برنامه نویسی ایران لرن محفوظ است.
        </span>
      </div>
    </footer>
  );
}
