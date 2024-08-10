import React, { useState, useEffect, useContext } from 'react'
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import regex from "../../../validators/regex";
import AuthContext from "../../../context/authContext";
import swal from "sweetalert";

export default function Menus() {
  const authContext = useContext(AuthContext)
  const [menus, setMenus] = useState([]);
  const [menuParent, setMenuParent] = useState("-1");
  const [title, setTitle] = useState("");
  const [href, setHref] = useState("");

  useEffect(() => {
    getAllMenus()
  }, []);



  function getAllMenus() {

    fetch("http://localhost:4000/v1/menus/all")
      .then((res) => res.json())
      .then((allMenus) => {
        setMenus(allMenus)

      });

  }

  const checkValidForm = () =>{
    if(regex.minValue(5, title) && regex.minValue(5, href)){
      return false
    }else{
      return true
    }
  }


  const removeMenu = (menuID) => {
    swal({
      title: "آیا از حذف منو اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/menus/${menuID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
              }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "منوی مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllMenus();
            });
          }
        });
      }
    });
  };

  const createMenu = (event) => {
    event.preventDefault();
    const newMenuInfo = {
      title,
      href,
      parent: menuParent === "-1" ? undefined : menuParent,
    };

    fetch(`http://localhost:4000/v1/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
          }`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuInfo),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "منوی جدید با موفقیت ایجاد شد",
          icon: "success",
          buttons: "اوکی",
        }).then((result) => {
          emptyInputs()
          getAllMenus();
        });
      }
    });
  };

  function emptyInputs() {
      setTitle("")
      setHref("")
  }

  return (
    <div>
      <div className="container">
        <div className="home-title">
          <span>افزودن منوی جدید</span>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">عنوان</label>
              <input
                className={`${!regex.minValue(5, title) && "error"}`}
                type="text"
                placeholder="لطفا عنوان را وارد کنید..."
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title">مسیر</label>
              <input
                className={`${!regex.minValue(5, href) && "error"}`}
                type="text"
                placeholder="لطفا مسیر را وارد کنید..."
                value={href}
                onChange={event => setHref(event.target.value)}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="name input">
              <label className="input-title"> عنوان منوی اصلی</label>
              <select
                className="select"
                style={{ marginRight: "5px", padding: "5px" }}
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">منوی اصلی را انتخاب کنید</option>
                {menus.map((menu) => (
                  <>
                    {!(menu.parent) && (
                      <option value={menu._id}>{menu.title}</option>
                    )}
                  </>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" disabled={checkValidForm()} onClick={createMenu} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="منوها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>فرزند ...</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{menu.title}</td>
                <td>{menu.href}</td>
                <td>{menu.parent ? menu.parent.title : (<i className="fa fa-check"></i>)}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    ویرایش
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={() => removeMenu(menu._id)}>
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
