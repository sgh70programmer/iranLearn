import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircleSpinner from "../CircleSpinner/CircleSpinner";

import "./CourseBox.css";

export default function CourseBox(props) {
  const [isImgShow, setIsImgShow] = useState(false)
  const ImageLoaded = () => setIsImgShow(true)



  return (
    <div className="col-4" style={{ width: `${props.isSlider && "100%"}` }}>
      <div className="course-box">
        <Link to={`/course-info/${props.shortName}/1`}>
          <img
            src={`http://localhost:4000/courses/covers/${props.cover}`}
            alt="Course img"
            className="course-box__img"
            onLoad={ImageLoaded}
            loading="lazy"
          />
          {!isImgShow && <CircleSpinner />}
        </Link>
        <div className="course-box__main">
          <Link to={`/course-info/${props.shortName}/1`} className="course-box__title">
            {props.name}
          </Link>

          <div className="course-box__rating-teacher">
            <div className="course-box__teacher">
              <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
              <a href="#" className="course-box__teacher-link">
                {props.creator || ""}
              </a>
            </div>
            <div className="course-box__rating">
              {Array(5 - (props.courseAverageScore || 0))
                .fill(0)
                .map((item, index) => (
                  <img key={index + "_"}
                    src="/images/svgs/star.svg"
                    alt="rating"
                    className="course-box__star"
                    loading="lazy"
                  />
                ))}
              {Array(props.courseAverageScore || 0)
                .fill(0)
                .map((item, index) => (
                  <img key={index + "_"}
                    src="/images/svgs/star_fill.svg"
                    alt="rating"
                    className="course-box__star"
                    loading="lazy"
                  />
                ))}
            </div>
          </div>

          <div className="course-box__status">
            <div className="course-box__users">
              <i className="fas fa-users course-box__users-icon"></i>
              <span className="course-box__users-text">{props.registers || ""}</span>
            </div>
            <span className="course-box__price">
              {
                props.price === 0 ? 'رایگان' : <>
                <span style={{textDecoration:`${props.discount && "line-through"}`}}>{props.price.toLocaleString()}</span>
                {props.discount && <span style={{paddingLeft:"1rem", color:"goldenrod"}}>{Math.round(props.price *((100-props.discount)/100)).toLocaleString()}</span>}
                
                </>
              }</span>
          </div>
        </div>

        <div className="course-box__footer">
          <Link to={`/course-info/${props.shortName}/1`} className="course-box__footer-link">
            مشاهده اطلاعات
            <i className="fas fa-arrow-left course-box__footer-icon"></i>
          </Link>
          {(props.price !== 0 && props.discount) && (
            <span className="courses-box__discount">%{props.discount}</span>
          )}

        </div>
      </div>
    </div>
  );
}
