import React, { useState, useEffect } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { useParams, Link } from "react-router-dom";
import './Session.css'

export default function Session() {
  const { courseName, sessionID } = useParams()
  const [session, setSession] = useState({})
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    getSession()
  }, [session, sessions])

  const getSession = () =>{
    fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
          }`,
      },
    }).then(res => res.json())
      .then(data => {
        setSession(data.session)
        setSessions(data.sessions)
      })
  }

  return (
    <div>
      <Topbar />
      <Navbar />
      <section className="content">
        <div className="col-4">
          <div className="sidebar">
            <div className="sidebar__header">
              <a className="sidebar__header-link" href="#">
                <span><i className="sidebar__haeder-icon fa fa-book-open"></i></span>
                
                لیست جلسات
              </a>
            </div>
            <div className="sidebar-topics">
              <div className="sidebar-topics__item">
                <ul className="sidebar-topics__list">
                  {
                    sessions?.map(session => (
                      <Link to={`/${courseName}/${session._id}`} onClick={getSession}>
                        <li className="sidebar-topics__list-item">
                          <div className="sidebar-topics__list-right">
                            <span><i className="sidebar-topics__list-item-icon fa fa-play-circle"></i></span>
                            
                            <a className="sidebar-topics__list-item-link" href="#">
                              {
                                session.title
                              }
                            </a>
                          </div>
                          <div className="sidebar-topics__list-left">
                            <span className="sidebar-topics__list-item-time">
                              {session.time}
                            </span>
                          </div>
                        </li>
                      </Link>
                    ))
                  }

                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="episode">
            <div className="episode-haeder">
              <div className="episode-header__right">
                <a className="episode-header__right-back-link" href="#">
                  <span><i className="episode-header__right-back-icon fa fa-angle-right"></i></span>
                  
                  <div className="episode-header__right-home">
                    <Link className="episode-header__right-home-link" to={`/course-info/${courseName}`}>
                      به دوره خانه بروید
                    </Link>
                    <span><i className="episode-header__right-home-icon fa fa-home"></i></span>
                    
                  </div>
                </a>
              </div>
              <div className="episode-header__left">
                <span> <i className="episode-header__left-icon fa fa-play-circle"></i></span>
               
                <span className="episode-header__left-text">
                  {" "}
                  {session?.title}
                </span>
              </div>
            </div>
            <div className="episode-content">
              <video
                className="episode-content__video"
                controls
                src={`http://localhost:4000/courses/covers/${session?.video}`}
              ></video>
              <a className="episode-content__video-link" href="#">
                دانلود ویدئو
              </a>
              <div className="episode-content__bottom">
                <a className="episode-content__backward" href="#">
                  <span><i className="episode-content__backward-icon fa fa-arrow-right"></i></span>
                  
                  قبلی
                </a>
                <a className="episode-content__forward" href="#">
                  بعدی
                  <span><i className="episode-content__backward-icon fa fa-arrow-left"></i></span>
                  
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
