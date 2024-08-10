import React, { useState, useEffect } from 'react'
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import regex from "../../../validators/regex";
import swal from "sweetalert";
import './Courses.css'

export default function Courses() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [courseStatus, setCourseStatus] = useState('start')
  const [courseCover, setCourseCover] = useState({})
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [shortName, setShortName] = useState("")
  const [price, setPrice] = useState("")
  const [support, setSupport] = useState("")


  useEffect(() => {
    getAllCourses()
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
        setCourseCategory(allCategories[0]._id)
      });
  }, []);



  function getAllCourses() {
    fetch("http://localhost:4000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
      });
  }
  
  const checkValidForm = () =>{
    if(regex.minValue(3, name) && regex.minValue(5, shortName) && regex.minValue(5, description) && regex.minValue(5, support) && regex.isLength(price)){
      return false
    }else{
      return true
    }
  }

  const removeCourse = (courseID) => {

    swal({
      title: "آیا از حذف دوره اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {

      if (result) {
        fetch(`http://localhost:4000/v1/courses/${courseID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        })
          .then((res) => {
            if (res.ok) {
              swal({
                title: "دوره موردنظر با موفقیت حذف شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                getAllCourses();
              });
            } else {
              swal({
                title: "حذف دوره با مشکلی مواجه شد",
                icon: "error",
                buttons: "اوکی",
              })
            }
          })
      }
    });
  };

  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
  };

  const emptyInputs = () =>{

    setName("")
    setDescription("")
    setPrice("")
    setShortName("")
    setSupport("")
  }

  const addNewCourse = event => {
    event.preventDefault()
    let formData = new FormData()
    formData.append("name", name)
    formData.append('description', description)
    formData.append('shortName', shortName)
    formData.append('categoryID', courseCategory)
    formData.append('price', price)
    formData.append('support', support)
    formData.append('status', courseStatus)
    formData.append('cover', courseCover)
    fetch(`http://localhost:4000/v1/courses`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: formData
    }).then(res => {
      if (res.ok) {
        swal({
          title: 'دوره جدید با موفقیت اضافه شد',
          icon: 'success',
          buttons: 'اوکی'
        }).then(() => {
          emptyInputs()
          getAllCourses()
        })
      }
    })
  }

 


  return (
    <div>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دوره جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">نام دوره</label>
                <input
                  className={`${!regex.minValue(3, name) && "error"}`}
                  type="text"
                  placeholder="لطفا نام دوره را وارد کنید..."
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">توضیحات دوره</label>
                <input
                  className={`${!regex.minValue(5, description) && "error"}`}
                  type="text"
                  placeholder="لطفا توضیحات دوره را وارد کنید..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">Url دوره</label>
                <input
                  className={`${!regex.minValue(5, shortName) && "error"}`}
                  type="text"
                  placeholder="لطفا Url دوره را وارد کنید..."
                  value={shortName}
                  onChange={(event) => setShortName(event.target.value)}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">قیمت دوره</label>
                <input
                  className={`${!regex.isLength(price) && "error"}`}
                  type="text"
                  placeholder="لطفا قیمت دوره را وارد کنید..."
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">نحوه پشتیبانی دوره</label>
                <input
                  className={`${!regex.minValue(5, support) && "error"}`}
                  type="text"
                  placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
                  value={support}
                  onChange={(event) => setSupport(event.target.value)}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="number input">
                <label className="input-title">دسته‌بندی دوره</label>
                <select style={{ width: "100%" }} onChange={selectCategory}>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="file">
                <label className="input-title">عکس دوره</label>
                <input style={{ width: "100%" }} type="file" id="file" onChange={(event) => {
                  setCourseCover(event.target.files[0])
                }
                } />
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="condition">
                  <label className="input-title">وضعیت دوره</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>در حال برگزاری</span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={(event) => setCourseStatus(event.target.value)}
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <span>پیش فروش</span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onInput={(event) => setCourseStatus(event.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="submit-btn">
                  <input type="submit" value="افزودن" disabled={checkValidForm()} onClick={addNewCourse} />
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
      <DataTable title="دوره‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>لینک</th>
              <th>مدرس</th>
              <th>دسته بندی</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>{course.price === 0 ? 'رایگان' : course.price.toLocaleString()}</td>
                <td>{course.isComplete === 0 ? 'در حال برگزاری' : 'تکمیل شده'}</td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                <td>{course.categoryID.title}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={() => removeCourse(course._id)}>
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
