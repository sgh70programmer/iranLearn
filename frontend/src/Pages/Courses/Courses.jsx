import React, { useEffect, useState } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";


import "./Courses.css";

export default function Courses() {
  const [allCourses, setAllCourses] = useState([])
  const [shownCourses, setShownCourses] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then(res => res.json())
      .then(courses => setAllCourses(courses))
  }, [])
  return (
    <div>
      <Topbar/>
      <Navbar />

      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses",
          },
        ]}
      />

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownCourses.map(course => <CourseBox {...course} />)}


              </div>
            </div>
          </div>
          <Pagination
            items={allCourses}
            itemsCount={3}
            pathname="/courses"
            setShownItems={setShownCourses}
          />

        </div>
      </section>
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}

      <Footer />
    </div>
  );
}
