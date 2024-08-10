import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import AuthContext from "../../context/authContext";
import "./Navbar.css";



export default function Navbar() {

  const [allMenus, setAllMenus] = useState([]);
  const authContext = useContext(AuthContext)



  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then(res => res.json())
      .then(menus => {

        setAllMenus(menus)
      })
  }, [])
  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__right">
            <img
              src="/images/logo/Logo.png"
              className="main-header__logo"
              alt="لوگوی سبزلرن"
              loading="lazy"
            />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to="/" className="main-header__link">
                  صفحه اصلی
                </Link>
              </li>
              {allMenus.map((menu) => (

                <li key={menu._id} className="main-header__item">
                  <Link to={`${menu.href}/1`} className="main-header__link">
                    {menu.title}
                    {menu.submenus.length !== 0 && (
                      <>
                        <span><i className="fas fa-angle-down main-header__link-icon"></i></span>

                        <ul className="main-header__dropdown">
                          {menu.submenus.map((submenu) => (
                            <li key={submenu._id} className="main-header__dropdown-item">
                              <Link
                                to={`${submenu.href}/1`}
                                className="main-header__dropdown-link"
                              >
                                {
                                  submenu.title
                                }
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          <div className="main-header__left">
            {(authContext.isLoggedIn && authContext.userInfos.role == "ADMIN") && <Link to="/p-admin/" className="main-header__admin-btn" title="پنل ادمین">
              <MdAdminPanelSettings style={{ width: "2em", height: "2em" }} />

            </Link>}


            {authContext.isLoggedIn ? <>
              <Link to="/my-account" className="main-header__userpanel-btn" title="حساب کاربری">
                <FaUserCog style={{ width: "2em", height: "2em" }} />

              </Link>
              <Link to="/my-account" className="main-header__profile">

                <span className="main-header__profile-text">
                  {authContext.userInfos.name}
                </span>
              </Link>
            </>
              : <Link to="/login" className="main-header__profile">
                <span className="main-header__profile-text">
                  ورود / ثبت نام
                </span>
              </Link>}
          </div>
        </div>
      </div>
    </div>
  );
}
