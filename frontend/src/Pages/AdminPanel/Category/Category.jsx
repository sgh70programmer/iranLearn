import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import regex from "../../../validators/regex";
import swal from "sweetalert";
import "./Category.css";

export default function Category() {
  const [title, setTitle] = useState("")
  const [editTitle, setEditTitle] = useState("")
  const [name, setName] = useState("")
  const [editName, setEditName] = useState("")
  const [categories, setCategories] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    getAllCategories()
  }, []);

  function getAllCategories() {
    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }

  const checkValidForm = () => {
    if (regex.minValue(3, title) && regex.minValue(3, name)) {
      return false
    } else {
      return true
    }
  }

  const createNewCategory = (event) => {
    event.preventDefault();


    const newCategoryInfo = {
      title,
      name,
    };

    fetch("http://localhost:4000/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newCategoryInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "دسته بندی مورد نظر با موفقیت اضافه شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllCategories();
        });
      });
  };

  const removeCategory = (categoryID) => {

    swal({
      title: "آیا از حذف دسته بندی اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/category/${categoryID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            swal({
              title: "دسته بندی مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllCategories();
            });
          });
      }
    });
  };

  const updateCategory = (categoryID) => {

    swal({
      title: "عنوان جدید دسته بندی را وارد نمایید",
      content: {
        element: "form",
        attributes: {
          innerHTML: `
            <div className="col-12">
              <div className="name input">
                <input
                  id="title"
                  type="text"
                  placeholder="لطفا عنوان را وارد کنید..."
                  
                  
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="name input">
                <input
                  id="shortname"
                  type="text"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                    
                  
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            
            
          `
        }
      },

      buttons: "ثبت عنوان جدید",
    }).then((result) => {
      if (result) {
        const input1 = document.getElementById('title').value;
        const input2 = document.getElementById('shortname').value;
        if (input1.trim().length > 3 && input2.trim().length > 3) {
          fetch(`http://localhost:4000/v1/category/${categoryID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorageData.token}`,
            },
            body: JSON.stringify({
              title: input1,
              name: input2
            })
          })
            .then((res) => res.json())
            .then((result) => {
              swal({
                title: "دسته بندی مورد نظر با موفقیت ویرایش شد",
                icon: "success",
                buttons: "اوکی",
              }).then(() => {
                getAllCategories();
              });
            });
        } else {

          swal({
            title: "اطلاعات معتبر نیستند",
            icon: "error",
            buttons: "اوکی",
          })

        }

      }
    });




  }

  return (
    <div>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن دسته‌بندی جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان</label>
                <input
                  className={`${!regex.minValue(3, title) && "error"}`}
                  type="text"
                  placeholder="لطفا عنوان را وارد کنید..."
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title">اسم کوتاه</label>
                <input
                  className={`${!regex.minValue(3, name) && "error"}`}
                  type="text"
                  placeholder="لطفا اسم کوتاه را وارد کنید..."
                  value={name}
                  onChange={(event) => setName(event.target.value)}

                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                    value="افزودن"
                    onClick={createNewCategory}
                    disabled={checkValidForm()}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="دسته‌بندی‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{category.title}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn" onClick={() => updateCategory(category._id)}>
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={() => removeCategory(category._id)}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </div>
  );
}
