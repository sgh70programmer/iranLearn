import React, { useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import CourseBox from '../../Components/CourseBox/CourseBox'
import Pagination from '../../Components/Pagination/Pagination'
import Footer from '../../Components/Footer/Footer'

import './Category.css'


export default function Category() {
  const [courses, setCourses] = useState([])
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([])
  const [status, setStatus] = useState('default')
  const [statusTitle, setStatusTitle] = useState('مرتب سازی پیش فرض')
  const [activeTitle, setActiveTitle] = useState('مرتب سازی پیش فرض')
  const [searchValue, setSearchValue] = useState('')
  const [coursesDisplayType, setCoursesDisplayType] = useState("row");
  const { categoryName } = useParams()


  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then(res => res.json())
      .then(allCourses => {
        setCourses(allCourses)
        setOrderedCourses(allCourses)
      })
  }, [categoryName])

  useEffect(() => {
    switch (status) {
      case 'free':
        const freeCourses = courses.filter(course => course.price === 0)
        setOrderedCourses(freeCourses)
        break

      case 'money':
        const notFreeCourses = courses.filter(course => course.price !== 0)
        setOrderedCourses(notFreeCourses)
        break

      case 'last':
        setOrderedCourses(courses)
        break

      case 'first':
        const reversedCourses = courses.slice().reverse()
        setOrderedCourses(reversedCourses)
        break

      default:
        setOrderedCourses(courses)
        break

    }
  }, [status])

  const statusTitleChangeHandler = (event) => {
    setStatusTitle(event.target.textContent);
    document.querySelectorAll(".courses-top-bar__selection-item").forEach(item => item.classList.remove("courses-top-bar__selection-item--active"))
    event.target.classList.add("courses-top-bar__selection-item--active")
  };

  const searchValueChangeHandler = (event) => {
    setSearchValue(event.target.value)
    const filteredCourses = courses.filter(course => course.name.includes(event.target.value))
    setOrderedCourses(filteredCourses)
  }

  return (
    <div>
      <Topbar />
      <Navbar />

      <section className="courses">
        <div className="container">


          <div className="courses-content">
            <div className="container">
              <div className="row">
                {courses.length == 0 ? <div className='alert alert-warning'>هنوز هیچ دوره ای برای این فهرست وجود ندارد</div> :
                  <>
                    <div className="courses-top-bar">
                      <div className="courses-top-bar__right">
                        <div className={`courses-top-bar__row-btn ${coursesDisplayType == "row" ? "courses-top-bar__icon--active" : ""}`} onClick={() => setCoursesDisplayType("row")}>
                          <i className="fas fa-border-all courses-top-bar__icon"></i>
                        </div>
                        <div className={`courses-top-bar__row-btn ${coursesDisplayType == "column" ? "courses-top-bar__icon--active" : ""}`} onClick={() => setCoursesDisplayType("column")}>
                          <i className="fas fa-align-left courses-top-bar__icon"></i>
                        </div>

                        <div className="courses-top-bar__selection">
                          <span className="courses-top-bar__selection-title">
                            {
                              statusTitle
                            }
                            <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                          </span>
                          <ul className="courses-top-bar__selection-list">
                            <li className="courses-top-bar__selection-item courses-top-bar__selection-item--active" onClick={(event) => {
                              setStatus('مرتب سازی پیش فرض')
                              statusTitleChangeHandler(event)
                            }}>
                              مرتب سازی پیش فرض
                            </li>
                            <li className="courses-top-bar__selection-item" onClick={(event) => {
                              setStatus('free')
                              statusTitleChangeHandler(event)
                            }}>
                              مرتب سازی دوره های رایگان
                            </li>
                            <li className="courses-top-bar__selection-item" onClick={(event) => {
                              setStatus('money')
                              statusTitleChangeHandler(event)
                            }}>
                              مرتب سازی دوره های پولی
                            </li>
                            <li className="courses-top-bar__selection-item" onClick={(event) => {
                              setStatus('last')
                              statusTitleChangeHandler(event)
                            }}>
                              مرتب سازی بر اساس آخرین
                            </li>
                            <li className="courses-top-bar__selection-item" onClick={(event) => {
                              setStatus('first')
                              statusTitleChangeHandler(event)
                            }}>
                              مرتب سازی بر اساس اولین
                            </li>
                            <li className="courses-top-bar__selection-item" onClick={(event) => {
                              setStatus('cheap')
                              statusTitleChangeHandler(event)
                            }}>
                              مرتب سازی بر اساس ارزان ترین
                            </li>
                            <li className="courses-top-bar__selection-item" onClick={(event) => {
                              setStatus('expensive')
                              statusTitleChangeHandler(event)
                            }}>
                              مرتب سازی بر اساس گران ترین
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="courses-top-bar__left">
                        <form action="#" className="courses-top-bar__form">
                          <input
                            type="text"
                            className="courses-top-bar__input"
                            placeholder="جستجوی دوره ..."
                            value={searchValue}
                            onChange={searchValueChangeHandler}
                          />
                          <i className="fas fa-search courses-top-bar__search-icon"></i>
                        </form>
                      </div>
                    </div>
                    {shownCourses.length == 0 ? (<div className='alert alert-warning'>هیچ دوره ای برای {statusTitle} وجود ندارد</div>) :
                      <>
                        {coursesDisplayType === "row" ? <>
                          {
                            shownCourses.map(course => (
                              <CourseBox {...course} />
                            ))
                          }
                        </> : <>
                        {shownCourses.map((course) => (
                              <div className="col-12">
                                <div className="course-box">
                                  <div className="course__box-header">
                                    <div className="course__box-right">
                                      <a
                                        className="course__box-right-link"
                                        href="#"
                                      >
                                        <img
                                          src="/images/courses/fareelancer.png"
                                          className="course__box-right-img"
                                          loading="lazy"
                                        />
                                      </a>
                                    </div>
                                    <div className="course__box-left">
                                      <div className="course__box-left-top">
                                        <a
                                          href="#"
                                          className="course__box-left-link"
                                        >
                                          {course.name}
                                        </a>
                                      </div>
                                      <div className="course__box-left-center">
                                        <div className="course__box-left-teacher">
                                          <i className="course__box-left-icon fa fa-chalkboard-teacher"></i>
                                          <span className="course__box-left-name">
                                            {course.creator}
                                          </span>
                                        </div>
                                        <div className="course__box-left-stars">
                                          <span className="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" loading="lazy"/>
                                            
                                          </span>
                                          <span className="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" loading="lazy"/>
                                          </span>
                                          <span className="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" loading="lazy"/>
                                          </span>
                                          <span className="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" loading="lazy"/>
                                          </span>
                                          <span className="course__box-left-star">
                                            <img src="/images/svgs/star_fill.svg" loading="lazy"/>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="course__box-left-bottom">
                                        <div className="course__box-left-des">
                                          <p>{course.description}</p>
                                        </div>
                                      </div>
                                      <div className="course__box-footer">
                                        <div className="course__box-footer-right">
                                          <i className="course__box-footer-icon fa fa-users"></i>
                                          <span className="course__box-footer-count">
                                            202
                                          </span>
                                        </div>
                                        <span className="course__box-footer-left">
                                          {course.price === 0
                                            ? "رایگان"
                                            : course.price.toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        }

                      </>
                    }

                    <Pagination
                      items={orderedCourses}
                      itemsCount={3}
                      pathname={`/category-info/${categoryName}`}
                      setShownItems={setShownCourses}
                    />
                  </>

                }

              </div>
            </div>
          </div>



        </div>
      </section>

      <Footer />
    </div>
  )
}


