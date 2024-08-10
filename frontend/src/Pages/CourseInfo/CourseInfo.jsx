import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import CourseDetailBox from '../../Components/CourseDetailBox/CourseDetailBox'
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea"
import Accordion from 'react-bootstrap/Accordion';
import swal from 'sweetalert'
import './CourseInfo.css'

export default function CourseInfo() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(true)
  const [hasErr, setHasErr] = useState(false)
  const [courseDetails, setCourseDetails] = useState({})
  const [relatedCourses, setRelatedCourses] = useState([]);

  const { courseName } = useParams()
  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then((res) => res.json())
      .then((allData) => {
        if(allData.message){
          setRelatedCourses([])
        }else{

          setRelatedCourses(allData);
        }
      });
    getCourseDetails()


  }, [courseName])

  function getCourseDetails() {
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorageData.token}`
      }
    }).then(res => res.json())
      .then(courseInfo => {
        if (courseInfo.message) {
          setHasErr(true)
        } else {
          setCourseDetails(courseInfo)
          setHasErr(false)
        }

      })
      .catch(err => {})
      .finally(() => setIsLoading(false))



  }

  const registerInCourse = (course) => {
    if (course.price === 0) {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                }`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              price: course.price,
            }),
          }).then((res) => {
            if (res.ok) {
              swal({
                title: "ثبت نام با موفقیت انجام شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                getCourseDetails();
              });
            }
          });
        }
      });
    } else {
      swal({
        title: "آیا از ثبت نام در دوره اطمینان دارید؟",
        icon: "warning",
        buttons: ["نه", "آره"],
      }).then((result) => {
        if (result) {
          swal({
            title: "در صورت داشتن کد تخفیف وارد کنید:",
            content: "input",
            buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"],
          }).then((code) => {
            if (code === null) {
              fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  price: course.price,
                }),
              }).then((res) => {
                if (res.ok) {
                  swal({
                    title: "ثبت نام با موفقیت انجام شد",
                    icon: "success",
                    buttons: "اوکی",
                  }).then(() => {
                    getCourseDetails();
                  });
                }
              });
            } else {
              fetch(`http://localhost:4000/v1/offs/${code}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  course: course._id,
                }),
              })
                .then((res) => {

                  if (res.status == 404) {
                    swal({
                      title: "کد تخفیف معتبر نیست",
                      icon: "error",
                      buttons: "ای بابا",
                    });
                  } else if (res.status == 409) {
                    swal({
                      title: "کد تخفیف قبلا استفاده شده :/",
                      icon: "error",
                      buttons: "ای بابا",
                    });
                  } else {
                    return res.json();

                  }
                })
                .then(code => {
                  if (code) {
                    fetch(
                      `http://localhost:4000/v1/courses/${course._id}/register`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                            }`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          price: course.price - (course.price * code.percent / 100)
                        }),
                      }
                    )
                      .then(res => {
                        if (res.ok) {
                          swal({
                            title: "ثبت نام با موفقیت انجام شد",
                            icon: "success",
                            buttons: "اوکی",
                          }).then(() => {
                            getCourseDetails();
                          });
                        }
                      })
                  }
                })

            }
          });
        }
      });
    }
  };

  const submitComment = (newCommentBody, commentScore) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"))
    fetch(`http://localhost:4000/v1/comments`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorageData.token}`
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: commentScore
      })
    })
      .then(res => res.json())
      .then(result => {

        swal({
          title: 'کامنت موردنظر با موفقیت ثبت شد',
          icon: 'success',
          button: 'تایید'
        })
      })
  }
  //  Loader screen - Sabzlearn.ir
  if (isLoading) {
    return (
      <div className='loader-screen'>
        <div className="loader">
          <label>Please wait...</label>
          <div className="loading"></div>
        </div>
      </div>

    )
  } else if (hasErr && !isLoading) { // Error Screen
    return (
      <div>
        <Topbar />
        <Navbar />
        <div className='err-wrapper'>
          <div className="main_wrapper">
            <div className="main">
              <div className="antenna">
                <div className="antenna_shadow"></div>
                <div className="a1"></div>
                <div className="a1d"></div>
                <div className="a2"></div>
                <div className="a2d"></div>
                <div className="a_base"></div>
              </div>
              <div className="tv">
                <div className="cruve">
                  <svg
                    xmlSpace="preserve"
                    viewBox="0 0 189.929 189.929"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    className="curve_svg"
                  >
                    <path
                      d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
        C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
                    ></path>
                  </svg>
                </div>
                <div className="display_div">
                  <div className="screen_out">
                    <div className="screen_out1">
                      <div className="screen">
                        <span className="notfound_text"> NOT FOUND</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lines">
                  <div className="line1"></div>
                  <div className="line2"></div>
                  <div className="line3"></div>
                </div>
                <div className="buttons_div">
                  <div className="b1"><div></div></div>
                  <div className="b2"></div>
                  <div className="speakers">
                    <div className="g1">
                      <div className="g11"></div>
                      <div className="g12"></div>
                      <div className="g13"></div>
                    </div>
                    <div className="g"></div>
                    <div className="g"></div>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="base1"></div>
                <div className="base2"></div>
                <div className="base3"></div>
              </div>
            </div>
            <div className="text_404">
              <div className="text_4041">4</div>
              <div className="text_4042">0</div>
              <div className="text_4043">4</div>
            </div>
          </div>
          دوره ای که دنبالش میگردین پیدا نشد
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Topbar />
        <Navbar />

        <Breadcrumb
          links={[{ id: 1, title: "خانه", to: '' },
          { id: 2, title: `${courseDetails?.categoryID?.title}`, to: `${`category-info/${courseDetails?.categoryID?.name}/1`}` },
          { id: 3, title: `${courseDetails?.name}`, to: `${`course-info/${courseDetails?.shortName}`}` },
          ]}
        />
        <section className="course-info">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <a href="#" className="course-info__link">
                  {courseDetails?.categoryID?.title}
                </a>
                <h1 className="course-info__title">
                  {courseDetails?.name}
                </h1>
                <p className="course-info__text">
                  {courseDetails?.description}
                </p>
                <div className="course-info__social-media">
                  <a href="#" className="course-info__social-media-item">
                    <i className="fab fa-telegram-plane course-info__icon"></i>
                  </a>
                  <a href="#" className="course-info__social-media-item">
                    
                    <span><i className="fab fa-twitter course-info__icon"></i></span>
                  </a>
                  <a href="#" className="course-info__social-media-item">
                    <span><i className="fab fa-facebook-f course-info__icon"></i></span>
                    
                  </a>
                </div>
              </div>

              <div className="col-6">
                <video
                  src=""
                  poster="/images/courses/js_project.png"
                  className="course-info__video"
                  controls
                ></video>
              </div>
            </div>
          </div>
        </section>
        <main className="main">
          <div className="container">
            <div className="row">
              <div className="col-8">
                <div className="course">
                  <div className="course-boxes">
                    <div className="row">
                      <CourseDetailBox
                        icon='graduation-cap'
                        title='وضعیت دوره:'
                        description={courseDetails.isComplete ? "به اتمام رسیده" : "در حال برگزاری"}
                      />
                      <CourseDetailBox
                        icon="clock"
                        title="زمان برگزاری:"
                        description={courseDetails.createdAt.slice(0, 10)}
                      />
                      <CourseDetailBox
                        icon="calendar-alt"
                        title="آخرین بروزرسانی:"
                        description={courseDetails.updatedAt.slice(0, 10)}
                      />

                    </div>
                  </div>

                  <div className="course-progress">
                    <div className="course-progress__header">
                      <span><i className="fas fa-chart-line course-progress__icon"></i></span>
                      
                      <span className="course-progress__title">
                        درصد پیشرفت دوره: 75%
                      </span>
                    </div>
                    <div className="progress course-progress__bar">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-label="Animated striped example"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>


                  <div className="introduction">
                    <div className="introduction__item">
                      <span className="introduction__title title">
                        آموزش 20 کتابخانه جاوا اسکریپت مخصوص بازار کار
                      </span>
                      <img
                        src="/images/info/1.gif"
                        alt="course info image"
                        className="introduction__img img-fluid"
                        loading="lazy"
                      />
                      <p className="introduction__text">
                        کتابخانه های بسیار زیادی برای زبان جاوا اسکریپت وجود دارد
                        و سالانه چندین کتابخانه جدید نیز به این لیست اضافه می شود
                        که در بازار کار به شدت از آن ها استفاده می شود و اگر بدون
                        بلد بودن این کتابخانه ها وارد بازار کار شوید، خیلی اذیت
                        خواهید شد و حتی ممکن است ناامید شوید!
                      </p>
                      <p className="introduction__text">
                        در این دوره نحوه کار با 20 مورد از پر استفاده ترین
                        کتابخانه های جاوا اسکریپت به صورت پروژه محور به شما عزیزان
                        آموزش داده می شود تا هیچ مشکلی برای ورود به بازار کار
                        نداشته باشید
                      </p>
                    </div>
                    <div className="introduction__item">
                      <span className="introduction__title title">
                        هدف از این دوره چیست؟ (تنها راه ورود به بازار کار و کسب
                        درآمد)
                      </span>
                      <img
                        src="/images/info/2.jpg"
                        alt="course info image"
                        className="introduction__img img-fluid"
                        loading="lazy"
                      />
                      <p className="introduction__text">
                        وقتی برای اولین بار وارد یکی از شرکت های برنامه نویسی شدم،
                        از کتابخانه هایی به اسم Lodash و Formik استفاده می شد، در
                        حالی که من اولین بارم بود اسم Formik را می شنیدم و تا اون
                        موقع از این کتابخانه ها استفاده نکرده بودم.
                      </p>
                      <p className="introduction__text">
                        همینجا بود که متوجه شدم کتابخانه های جاوا اسکریپت یکی از
                        مهم ترین مباحثی هستند که هر برنامه نویس وب برای ورود به
                        بازار کار و کسب درآمد بهتر، راحت و بیشتر باید با آن ها کار
                        کرده باشد{" "}
                      </p>
                      <p className="introduction__text">
                        همان طور که از اسم این دوره مشخص است، هدف از این دوره
                        آموزش 20 مورد از کاربردی ترین و پر استفاده ترین کتابخانه
                        های جاوا اسکریپت است تا شما بتوانید بعد از این دوره با
                        قدرت و آمادگی بیشتر ادامه مسیر برنامه نویسی وب را ادامه
                        دهید، ری اکت یا نود یا … را راحت تر یاد بگیرید و در نهایت
                        وارد بازار کار شده و کسب درآمد کنید.
                      </p>
                      <p className="introduction__text">
                        شا به عنوان یک برنامه نویس وب، حداقل اگر با کتابخانه خاصی
                        کار نکرده باشید، باید بلد باشید که چطور باید یک کتابخانه
                        جدید را یاد بگیرید. فرض کنید یک یک کتابخانه جدید ساخته شد.
                        آیا شما باید منتظر دوره آموزشی باشید؟! قطعا نه.
                      </p>
                      <p className="introduction__text">
                        در این دوره سعی کردیم علاوه بر آموزش مستقیم هر کتابخانه،
                        نحوه یادگیری یک کتابخانه جدید را نیز به شما عزیزان آموزش
                        دهیم تا بعد از گذراندن دوره، دیگر وابسته هیچ دوره یا شخص
                        خاصی نباشید و اگر کتابخانه جدیدی به دنیای جاوا اسکریپت و
                        وب اضافه شد، به راحتی بتوانید آن را یاد بگیرید.
                      </p>
                    </div>
                    <div className="introduction__btns">
                      <a href="#" className="introduction__btns-item">
                        دانلود همگانی ویدیوها
                      </a>
                      <a href="#" className="introduction__btns-item">
                        دانلود همگانی پیوست‌ها
                      </a>
                    </div>

                    <div className="introduction__topic">
                      <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0" className="accordion">
                          <Accordion.Header>جلسات دوره</Accordion.Header>
                          {courseDetails.sessions.map((session, index) => <Accordion.Body key={session._id} className="introduction__accordion-body">
                            {session.free || courseDetails.isUserRegisteredToThisCourse ? (<>
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">{index + 1}</span>
                                <span><i className="fab fa-youtube introduction__accordion-icon"></i></span>
                                
                                <Link to={`/${courseName}/${session._id}`} className="introduction__accordion-link">
                                  {session.title}
                                </Link>
                              </div>
                              <div className="introduction__accordion-left">
                                <span className="introduction__accordion-time">
                                  {session.time}
                                </span>
                              </div>
                            </>) : (<>
                              <div className="introduction__accordion-right">
                                <span className="introduction__accordion-count">{index + 1}</span>
                                <span><i className="fab fa-youtube introduction__accordion-icon"></i></span>
                                
                                <span href="#" className="introduction__accordion-link">
                                  {session.title}
                                </span>
                              </div>
                              <div className="introduction__accordion-left">
                                <span className="introduction__accordion-time">
                                  {session.time}
                                </span>
                                <span><i className="fa fa-lock"></i></span>
                                
                              </div>
                            </>)}
                          </Accordion.Body>)}

                        </Accordion.Item>

                      </Accordion>
                    </div>
                  </div>


                  <div className="techer-details">
                    <div className="techer-details__header">
                      <div className="techer-details__header-right">
                        <img
                          src="/images/sadegh.jpg"
                          alt="Teacher Profile"
                          className="techer-details__header-img"
                          loading="lazy"
                        />
                        <div className="techer-details__header-titles">
                          <a href="#" className="techer-details__header-link">
                            {courseDetails.creator.name}
                          </a>
                          <span className="techer-details__header-skill">
                            Front End & Back End Developer
                          </span>
                        </div>
                      </div>
                      <div className="techer-details__header-left">
                        <span><i className="fas fa-chalkboard-teacher techer-details__header-icon"></i></span>
                        
                        <span className="techer-details__header-name">مدرس</span>
                      </div>
                    </div>
                    <p className="techer-details__footer">
                      اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2
                      سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در
                      زمینه وب فعالیت داشته باشم.و..
                    </p>
                  </div>

                  <div>
                    {<CommentsTextArea comments={courseDetails.comments} onSubmitComment={submitComment} />}
                  </div>


                </div>
              </div>
              <div className="col-4">
                <div className="courses-info">
                  <div className="course-info">
                    <div className="course-info__register">
                      {courseDetails.isUserRegisteredToThisCourse ? (
                        <span className="course-info__register-title">
                          <i className="fas fa-graduation-cap course-info__register-icon"></i>
                          دانشجوی دوره هستید
                        </span>
                      ) : (
                        <span className="course-info__register-title" style={{ cursor: "pointer", width: "100%", display: "inline-block" }}
                          onClick={() => registerInCourse(courseDetails)}
                        >
                          ثبت نام در دوره
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="course-info">
                    <div className="course-info__total">
                      <div className="course-info__top">
                        <div className="course-info__total-sale">
                          <span> <i className="fas fa-user-graduate course-info__total-sale-icon"></i></span>
                         
                          <span className="course-info__total-sale-text">
                            تعداد دانشجو :
                          </span>

                          <span className="course-info__total-sale-number">{courseDetails.courseStudentsCount}</span>
                        </div>
                      </div>
                      <div className="course-info__bottom">
                        <div className="course-info__total-comment">
                          <span><i className="far fa-comments course-info__total-comment-icon"></i></span>
                          
                          <span className="course-info__total-comment-text">
                            67 دیدگاه
                          </span>
                        </div>
                        <div className="course-info__total-view">
                          <span><i className="far fa-eye course-info__total-view-icon"></i></span>
                          
                          <span className="course-info__total-view-text">
                            14,234 بازدید
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="course-info">
                    <div className="course-info__header-short-url">
                      <span><i className="fas fa-link course-info__short-url-icon"></i></span>
                      
                      <span className="course-info__short-url-text">لینک کوتاه</span>
                    </div>
                    <span className="course-info__short-url">
                      https://iranlearn.ir/?p=117472
                    </span>
                  </div>
                  <div className="course-info">
                    <span className="course-info__topic-title">سرفصل های دوره</span>
                    <span className="course-info__topic-text">
                      برای مشاهده و یا دانلود دوره روی کلمه
                      <a href="#" style={{ color: 'blue', fontWeight: 'bold' }}> لینک  </a>
                      کلیک کنید
                    </span>
                  </div>
                  {relatedCourses.length !== 0 && (
                    <div className="course-info">
                      <span className="course-info__courses-title">
                        دوره های مرتبط
                      </span>
                      <ul className="course-info__courses-list">
                        {relatedCourses.map((course) => (
                          <li className="course-info__courses-list-item">
                            <Link
                              to={`/course-info/${course.shortName}`}
                              className="course-info__courses-link"
                            >
                              <img
                                src={`http://localhost:4000/courses/covers/${course.cover}`}
                                alt="Course Cover"
                                className="course-info__courses-img"
                                loading="lazy"
                              />
                              <span className="course-info__courses-text">
                                {course.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }



}
