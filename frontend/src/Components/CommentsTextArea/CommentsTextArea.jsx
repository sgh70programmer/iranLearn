import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Pagination from "../../Components/Pagination/Pagination";

import "./CommentsTextArea.css";

export default function CommentsTextArea({ comments, onSubmitComment }) {
  const [newCommentBody, setNewCommentBody] = useState("");
  const [commentScore, setCommentScore] = useState("-1");
  const [shownComments, setShownComments] = useState([])
  const authContext = useContext(AuthContext)
  const { page, courseName } = useParams()

  const onChangeHandler = (event) => {
    setNewCommentBody(event.target.value);
  };

  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-icon-content">
          <span><i className="comments__header-icon far fa-comment"></i></span>

        </div>
        <span className="comments__header-title">نظرات</span>
      </div>
      <div className="comments__content">
        {comments.length === 0 ? (
          <div className="alert alert-warning">
            هنوز کامنتی برای این دوره ثبت نشده
          </div>
        ) : (
          <>
            {shownComments.map((comment) => (

              <div className="comments__item">
                <div className="comments__question">
                  <div className="comments__question-header">
                    <div className="comments__question-header-right">
                      <span className="comments__question-name comment-name">
                        {comment.creator.name}
                      </span>
                      <span className="comments__question-status comment-status">
                        {comment.creator.role === "ADMIN" ? "مدیر" : "کاربر"}
                      </span>
                      <span className="comments__question-date comment-date">
                        {comment.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="comments__question-header-left">
                      <a
                        className="comments__question-header-link comment-link"
                        href="#"
                      >
                        پاسخ
                      </a>
                    </div>
                  </div>
                  <div className="comments__question-text">
                    <p className="comments__question-paragraph comment-paragraph">
                      {comment.body}
                    </p>
                  </div>
                  {comment.answerContent && (
                    <div className="comments__item">
                      <div className="comments__question">
                        <div className="comments__question-header">
                          <div className="comments__question-header-right">
                            <span className="comments__question-name comment-name">
                              {comment.answerContent.creator.name}
                            </span>
                            <span className="comments__question-status comment-status">
                              {comment.answerContent.creator.role === "ADMIN"
                                ? "مدیر"
                                : "کاربر"}
                            </span>
                            <span className="comments__question-date comment-date">
                              {comment.answerContent.createdAt.slice(0, 10)}
                            </span>
                          </div>
                          <div className="comments__question-header-left">
                            <a
                              className="comments__question-header-link comment-link"
                              href="#"
                            >
                              پاسخ
                            </a>
                          </div>
                        </div>
                        <div className="comments__question-text">
                          <p className="comments__question-paragraph comment-paragraph">
                            {comment.answerContent.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            ))}
            <Pagination
              items={comments}
              itemsCount={2}
              pathname={`/course-info/${courseName}`}
              setShownItems={setShownComments}
            />
          </>
        )}
      </div>
      {authContext.isLoggedIn ? <>
        <div className="comments__rules">
          <span className="comments__rules-title">قوانین ثبت دیدگاه</span>
          <span className="comments__rules-item">
            <i className="fas fa-check comments__rules-icon"></i>
            اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش انلاین
            استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
          </span>
          <span className="comments__rules-item">
            <i className="fas fa-check comments__rules-icon"></i>
            دیدگاه های نامرتبط به دوره تایید نخواهد شد.
          </span>
          <span className="comments__rules-item">
            <i className="fas fa-check comments__rules-icon"></i>
            سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
          </span>
          <span className="comments__rules-item">
            <i className="fas fa-check comments__rules-icon"></i>
            از درج دیدگاه های تکراری پرهیز نمایید.
          </span>
        </div>
        <div className="comments__respond">
          <div className="comments__score">
            <span className="comments__score-title">امتیاز شما</span>
            <div className="col-12">
              <select className="form-select form-control font-bold" onChange={event => setCommentScore(event.target.value)}>
                <option value="-1" className="form-control">
                  امتیاز خود را انتخاب کنید
                </option>
                <option value="5">عالی</option>
                <option value="4">خیلی خوب</option>
                <option value="3">خوب</option>
                <option value="2">ضعیف</option>
                <option value="1">بد</option>
              </select>
            </div>
          </div>
          <div className="comments__respond-content">
            <div className="comments__respond-title">دیدگاه شما *</div>
            <textarea className="comments__score-input-respond" onChange={onChangeHandler}>
              {newCommentBody}
            </textarea>
          </div>
          <button type="submit" className="comments__respond-btn" onClick={() => onSubmitComment(newCommentBody, commentScore)}>
            ارسال
          </button>
        </div>
      </> : <div className="alert alert-danger">
        برای ثبت کامنت باید
        <Link to="/login">
          وارد
        </Link>
        شوید
      </div>}

    </div>
  );
}
