import React from "react";

import "./ArticleBox.css";
import { Link } from "react-router-dom";

export default function ArticleBox({ title, description, cover, shortName }) {
  return (
    <div className="col-4">
      <div className="article-card">
        <div className="article-card__header">
          <Link to={`/article-info/${shortName}`} className="article-card__link-img">
            <img
              src={`http://localhost:4000/courses/covers/${cover}`}
              className="article-card__img"
              alt="Article Cover"
              loading="lazy"
            />
          </Link>
        </div>
        <div className="article-card__content">
          <Link to={`/article-info/${shortName}`} className="article-card__link">
            {title}
          </Link>
          <p className="article-card__text">
            {description}  
          </p>
          <Link to={`/article-info/${shortName}`} className="article-card__btn">
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  );
}
