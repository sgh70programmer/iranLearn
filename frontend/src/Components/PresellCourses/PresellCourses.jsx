import React, { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from '../CourseBox/CourseBox'


import "swiper/css";

import "./PresellCourses.css";

export default function PresellCourses() {
  const [presellCourses, setPresellCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/presell")
      .then((res) => res.json())
      .then((allPresellCourses) => {
        setPresellCourses(allPresellCourses);
      });
  }, []);
  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title='دوره های در حال پیش فروش'
          desc='متن تستی برای توضیحات دوره های پیش فروش'
        />
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          className="mySwiper"
        >
          {presellCourses.map((course) => (
            
            <SwiperSlide key={course._id}>
              <CourseBox  {...course} isSlider />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
