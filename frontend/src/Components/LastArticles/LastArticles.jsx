import React, { useState, useEffect } from "react";
import SectionHeader from '../SectionHeader/SectionHeader'
import ArticleBox from "../ArticleBox/ArticleBox";
import "./LastArticles.css";

export default function LastArticles() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        setArticles(allArticles);
      });
  }, []);

  return (
    <section className="articles">
      <div className="container">

        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
          btnHref='articles/1'
        />
        <div className="articles__content">
          <div className="row">
            {articles.slice(0, 3).map(article => <ArticleBox key={article._id}  {...article}/>)}


          </div>
        </div>

      </div>
    </section>
  );
}
