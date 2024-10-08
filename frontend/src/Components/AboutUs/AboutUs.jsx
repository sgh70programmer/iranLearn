import React from "react";
import AboutUsBox from "../AboutUsBox/AboutUsBox";
import SectionHeader from "../SectionHeader/SectionHeader";

import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="container">
        <SectionHeader
          title="ما چه کمکی بهتون میکنیم؟"
          desc="از اونجایی که آکادمی آموزشی ایران لرن یک آکادمی خصوصی هست"
        />

        <div className="container">
          <div className="row">
              <AboutUsBox title="دوره های اختصاصی" desc="با پشتیبانی و کیفیت بالا ارائه میده !" icon="copyright"/>
              <AboutUsBox title="اجازه تدریس" desc="به هر مدرسی رو نمیده. چون کیفیت براش مهمه !" icon="leaf"/>
              <AboutUsBox title="دوره پولی و رایگان" desc="براش مهم نیست. به مدرسینش حقوق میده تا نهایت کیفیت رو در پشتیبانی و اپدیت دوره ارائه بده" icon="gem"/>
              <AboutUsBox title="اهمیت به کاربر" desc="اولویت اول و آخر آکادمی آموزش برنامه نویسی ایران لرن اهمیت به کاربرها و رفع نیاز های آموزشی و رسوندن اونها به بازار کار هست" icon="crown"/>
          </div>
        </div>
      </div>
    </div>
  );
}
