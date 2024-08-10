import React, {useState, useEffect} from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseBox from '../CourseBox/CourseBox'

import "./PopularCourses.css";

export default function PopularCourses() {
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/popular`)
      .then((res) => res.json())
      .then((popularCourses) => {
        setPopularCourses(popularCourses);
      });
  }, []);
  return (
    <div className="popular">
      <div className="container">
        <SectionHeader
          title="محبوب ترین دوره ها"
          desc="دوره های محبوب بر اساس امتیاز دانشجوها"
        />
         <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          className="mySwiper"
        >
          {popularCourses.map((course) => (
            <SwiperSlide key={course._id} >
              <CourseBox  {...course} isSlider />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
