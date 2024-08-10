import React, { useEffect, useState } from 'react'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import regex from "../../../validators/regex";
import swal from "sweetalert";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const localStorageData = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    getAllUsers()
  }, [])

  function getAllUsers() {
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    }).then(res => res.json())
      .then(allusers => setUsers(allusers))
  }

  const removeUser = userID => {
    swal({
      title: "آیا از حذف مطمئن هستی ؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(result => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/${userID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        })
          .then(res => {
            if (res.ok) {
              swal({
                title: "کاربر با موفقیت حذف شد",
                icon: "success",
                button: "اوکی",
              }).then(() => {
                getAllUsers()
              })
            }
          })
      }
    })
  }


  const changeRole = (user) => {

    swal({
      title: `${user.role == "ADMIN" ? "آیا از عزل کردن این مدیر به مقام کاربر مطمئن هستید؟" : "آیا از ترفیع این کاربر به مدیر مطمئن هستید؟"}`,
      button: "اوکی"
    }).then(() => {
      
        const reqBodyInfos = {
          role: user.role == "ADMIN" ? "USER" : "ADMIN",
          id: user._id
        }

        fetch(`http://localhost:4000/v1/users/role`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBodyInfos)
        }).then(res => {
          if (res.ok) {
            swal({
              title: "نقش کاربر مورد نظر با موفقیت تغییر یافت",
              icon: "success",
              buttons: "خیلی هم عالی"
            }).then(() => getAllUsers())
          }
        })
      
    })


  }


  const banUser = (userID) => {

    swal({
      title: "آیا از بن مطمئن هستی ؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {

          if (res.ok) {
            swal({
              title: "کاربر با موفقیت بن شد",
              icon: "success",
              buttons: "اوکی",
            })
          }
        });
      }
    });
  };

  const checkValidForm = () => {
    if (regex.minValue(5, name) && regex.check_username(username) && regex.testPhoneNumber(phone) && regex.testEmail(email) && regex.testPassword(password)) {
      return false
    } else {
      return true
    }
  }

  const registerNewUser = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name,
      username,
      email,
      phone,
      password,
      confirmPassword: password,
    };

    fetch('http://localhost:4000/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfo)
    }).then(res => {
      return res.json()
    }).then(result => {
      swal({
        title: 'با موفقیت ثبت نام کردید',
        icon: 'success',
        button: 'اوکی'
      })
      getAllUsers()
      emptyInputs()
    })
  };

  const emptyInputs = () =>{
    setName("")
    setEmail("")
    setPassword("")
    setPhone("")
    setUsername("")
    
    
  }


  return (
    <div>
      <div className="home-content-edit">
        <div className="back-btn">
          <i className="fas fa-arrow-right"></i>
        </div>
        <form className="form">
          <div className="col-6">
            <div className="name input">
              <label className="input-title">نام و نام خانوادگی</label>
              <input
                className={`${!regex.minValue(5, name) && "error"}`}
                type="text"
                placeholder="نام و نام خانوادگی"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                }}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="family input">
              <label className="input-title">نام کاربری</label>
              <input
                className={`${!regex.check_username(username) && "error"}`}
                type="text"
                placeholder="نام کاربری"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value)
                }}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="email input">
              <label className="input-title">ایمیل</label>
              <input
                className={`${!regex.testEmail(email) && "error"}`}
                type="email"
                placeholder="آدرس ایمیل"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="password input">
              <label className="input-title">رمز عبور</label>
              <input
                className={`${!regex.testPassword(password) && "error"}`}
                type="password"
                placeholder="رمز عبور"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-6">
            <div className="phone input">
              <label className="input-title">شماره تلفن</label>
              <input
                className={`${!regex.testPhoneNumber(phone) && "error"}`}
                type="text"
                placeholder="شماره تماس"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value)
                }}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" onClick={registerNewUser} disabled={checkValidForm()} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title="کاربران">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => <tr>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role === 'ADMIN' ? "مدیر" : "کاربر عادی"}</td>
              <td>
                <button type="button" className="btn btn-primary edit-btn">
                  ویرایش
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary edit-btn"
                  onClick={() => changeRole(user)}
                >
                  تغییر نقش
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-danger delete-btn" onClick={() => removeUser(user._id)}>
                  حذف
                </button>
              </td>
              <td>
                <button type="button" className="btn btn-danger delete-btn" onClick={() => banUser(user._id)}>
                  بن
                </button>
              </td>
            </tr>)}

          </tbody>
        </table>
      </DataTable>

    </div>

  )
}
