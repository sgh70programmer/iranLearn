import React from "react";
import { Link } from "react-router-dom";

import "./Breadcrumb.css";

export default function Breadcrumb({ links }) {
  return (
    <section className="breadcrumb">
      <div className="container">
        <div className="breadcrumb__content">
          <div className="breadcrumb__home-content-icon">
            <span><i className="fas fa-home breadcrumb__home-icon"></i></span>
            
          </div>
          <ul className="breadcrumb__list">
            {links.map((link, index) => (
              <li key={link.id} className="breadcrumb__item">
                <Link to={`/${link.to}`} className="breadcrumb__link">

                  {link.title}
                  {
                    index < links.length - 1 && (
                      <span><i className="fas fa-angle-left breadcrumb__icon"></i></span>
                      
                    )
                  }
                </Link>


              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
