import React, { useState, useEffect } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from 'sweetalert';
import Editor from "../../../Components/Form/Editor";
import { Link } from "react-router-dom";
import regex from "../../../validators/regex";

export default function Articles() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState("-1");
  const [articleCover, setArticleCover] = useState({});
  const [articleBody, setArticleBody] = useState("");
  const [title, setTitle] = useState("")
  const [shortName, setShortName] = useState("")
  const [description, setDescription] = useState("")
  const localStorageDate = JSON.parse(localStorage.getItem("user"));
 

  useEffect(() => {
    getAllArticles()
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, [])

  const getAllArticles = () => {
    fetch('http://localhost:4000/v1/articles')
      .then(res => res.json())
      .then(allArticles => {
        setArticles(allArticles)
      })
  }

  const removeArticle = (articleID) => {


    swal({
      title: "آیا از حذف مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/articles/${articleID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageDate.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "مقاله مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllArticles();
            });
          }
        });
      }
    });
  };

  const checkValidForm = () =>{
    if(regex.minValue(3, title) && regex.minValue(3, shortName) && regex.minValue(10, description)){
      return false
    }else{
      return true
    }
  }

  const createArticle = event => {
    event.preventDefault()
    let formData = new FormData()
    formData.append('title', title)
    formData.append('shortName', shortName)
    formData.append('description', description)
    formData.append('categoryID', articleCategory)
    formData.append('cover', articleCover)
    formData.append('body', articleBody)

    if (articleCategory === "-1") {
      swal({
        title: "لطفا دسته بندی دوره را انتخاب کنید",
        icon: "error",
        buttons: 'اوکی'
      });
    } else {
      fetch(`http://localhost:4000/v1/articles`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageDate.token}`
        },
        body: formData
      }).then(res => {
        if (res.ok) {
          swal({
            title: 'مقاله جدید با موفقیت ایجاد شد',
            icon: 'success',
            buttons: 'اوکی'
          }).then(() => {
            getAllArticles()
          })
        }
      })
    }
  }

  const saveArticleAsDraft = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("shortName", shortName);
    formData.append("description", description);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    fetch(`http://localhost:4000/v1/articles/draft`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
      },
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت پیش نویس شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllArticles();
        });
      }
    });
  };


  return (
    <div>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  عنوان
                </label>
                <input
                  type="text"
                  className={`${!regex.minValue(3, title) && "error"}`}
                  value={title}
                  onChange={(event) => {setTitle(event.target.value)}}
                 
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  لینک
                </label>
                <input
                  type="text"
                  className={`${!regex.minValue(3, shortName) && "error"}`}
                  value={shortName}
                  onChange={(event) => {setShortName(event.target.value)}}
                 
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  چکیده
                </label>

                <textarea
                  type="text"
                  className={`article-textarea ${!regex.minValue(10, description) && "error"}`}
                  value={description}
                  onChange={(event) => {setDescription(event.target.value)}}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  محتوا
                </label>
                <Editor
                  value={articleBody}
                  setValue={setArticleBody}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  کاور
                </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setArticleCover(event.target.files[0]);
                  }}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  دسته بندی
                </label>
                <select
                  style={{ padding: "5px 15px" }}
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value="-1">دسته بندی مقاله را انتخاب کنید...</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="انتشار" className='m-1' disabled={checkValidForm()} onClick={createArticle} />
                  <input type="submit" value="پیش نویس" className='m-1' disabled={checkValidForm()} onClick={saveArticleAsDraft} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="مقاله‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>وضعیت</th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{article.title}</td>
                <td>{article.shortName}</td>
                <td>{article.creator.name}</td>
                <td>{article.publish === 1 ? "منتشر شده" : "پیش‌نویس"}</td>
                <td>
                  {article.publish === 1 ? (
                    <span><i className="fa fa-check"></i></span>
                  ) : (
                    <Link
                      to={`draft/${article.shortName}`}
                      className="btn btn-primary edit-btn"
                    >
                      ادامه نوشتن
                    </Link>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeArticle(article._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  )
}
