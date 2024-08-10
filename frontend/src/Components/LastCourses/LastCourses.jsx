import React, {useState, useEffect} from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox"

import "./LastCourses.css";

export default function LastCourses() {
  const [courses, setCourses] = useState([]);
  
  

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses)});
  }, []);

  return (
    <div>
      <div className="courses">
        <div className="container">

          <SectionHeader
            title='جدیدترین دوره ها'
            desc='سکوی پرتاپ شما به سمت موفقیت'
            btnTitle="تمامی دوره ها"
            btnHref='courses/1'
          />
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.splice(0, 6).map((course, index) => <CourseBox key={index} {...course}/>)}        
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
