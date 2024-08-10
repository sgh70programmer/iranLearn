import React, { useState, useEffect } from "react";
import Editor from "../../../Components/Form/Editor";
import { useParams, useNavigate } from 'react-router-dom';
import regex from "../../../validators/regex";
import swal from 'sweetalert';

export default function Draft() {
  const [articleDetails, setArticleDetails] = useState({})
  const [articletitle, setArticletitle] = useState("")
  const [articleLink, setArticleLink] = useState("")
  const [articleDesc, setArticleDesc] = useState("")
  const [articleBody, setArticleBody] = useState("");
  const [articleCover, setArticleCover] = useState({});
  const [categories, setCategories] = useState([]);
  const [articleCategoryID, setArticleCategoryID] = useState("-1");
  const { shortName } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${shortName}`)
      .then(res => res.json())
      .then(articleInfo => {
        setArticleDetails(articleInfo)
        setArticletitle(articleInfo.title)
        setArticleLink(articleInfo.shortName)
        setArticleDesc(articleInfo.description)
        setArticleBody(articleInfo.body)
        setArticleCategoryID(articleInfo.categoryID._id)

      })

    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, [])

  const checkValidForm = () => {
    if (regex.minValue(3, articletitle) && regex.minValue(3, articleLink) && regex.minValue(10, articleDesc)) {
      return false
    } else {
      return true
    }
  }


  const createArticle = event => {
    event.preventDefault()
    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData()
    formData.append('title', articletitle)
    formData.append('shortName', articleLink)
    formData.append('description', articleDesc)
    formData.append('categoryID', articleCategoryID)
    formData.append('cover', articleCover)
    formData.append('body', articleBody)
    


    fetch(`http://localhost:4000/v1/articles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageDate.token}`,
      },
      body: formData
    }).then(res => {
      if (res.ok) {
        swal({
          title: 'مقاله جدید با موفقیت ایجاد شد',
          icon: 'success',
          buttons: 'اوکی'
        }).then(() => {
          navigate('/p-admin/articles')
        })
      }
    })

  }

  const saveArticleAsDraft = (event) => {
    event.preventDefault();
    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append('title', articletitle)
    formData.append('shortName', articleLink)
    formData.append('description', articleDesc)
    formData.append('categoryID', articleCategoryID)
    formData.append('cover', articleCover)
    formData.append('body', articleBody)

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
          navigate('/p-admin/articles')
        });
      }
    });
  };


  return (

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
              <input type="text"
                className={`${!regex.minValue(3, articletitle) && "error"}`}
                value={articletitle}
                onChange={(event) => setArticletitle(event.target.value)}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title" style={{ display: "block" }}>
                لینک
              </label>
              <input type="text"
               className={`${!regex.minValue(3, articleLink) && "error"}`}
               value={articleLink} 
               onChange={(event) => setArticleLink(event.target.value)} 
               />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="name input">
              <label className="input-title" style={{ display: "block" }}>
                چکیده
              </label>

              <input type="text" 
              className={`article-textarea ${!regex.minValue(10, articleDesc) && "error"}`}
              value={articleDesc} 
              onChange={(event) => setArticleDesc(event.target.value)} 
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
                setValue={setArticleBody} />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title" style={{ display: "block" }}>
                کاور
              </label>
              <input type="file" onChange={(event) => {
                setArticleCover(event.target.files[0]);
              }} />
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
                value={articleCategoryID}
                onChange={(event) => setArticleCategoryID(event.target.value)}>

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
                <input type="submit" value="انتشار" className="m-1" disabled={checkValidForm()} onClick={createArticle} />
                <input type="submit" value="پیش‌نویس" className="m-1" disabled={checkValidForm()} onClick={saveArticleAsDraft} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
}
