import React from "react";

import "./CourseDetailBox.css";

export default function CourseDetailBox({ title, description, icon }) {
  return (
    <div className="col-4">
      <div className="course-boxes__box">
        <div className="course-boxes__box-right">
          <span><i className={`course-boxes__box-right-icon fas fa-${icon}`}></i></span>
          
        </div>
        <div className="course-boxes__box-left">
          <span className="course-boxes__box-left-title">{title}</span>
          <span className="course-boxes__box-left--subtitle">{description}</span>
        </div>
      </div>
    </div>
  );
}
