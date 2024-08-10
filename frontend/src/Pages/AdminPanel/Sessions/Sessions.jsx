import React, { useEffect, useState } from "react";
import regex from "../../../validators/regex";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from 'sweetalert'

export default function Sessions() {
  const localStorageData = JSON.parse(localStorage.getItem('user'))
  const [courses, setCourses] = useState([]);
  const [sessionCourse, setSessionCourse] = useState('-1');
  const [sessionVideo, setSessionVideo] = useState({})
  const [sessions, setSessions] = useState([]);
  const [isSessionFree, setIsSessionFree] = useState(0)
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [file, setFile] = useState("")


  useEffect(() => {
    getAllSessions();
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
      });
  }, []);

  function getAllSessions() {
    fetch("http://localhost:4000/v1/courses/sessions")
      .then((res) => res.json())
      .then((allSessions) => setSessions(allSessions));
  }

  const checkValidForm = () =>{
    if(regex.minValue(5, title) && regex.isLength(time)){
      return false
    }else{
      return true
    }
  }

  const createSession = (event) =>{
    event.preventDefault()
    let formData = new FormData()
    formData.append('title', title)
    formData.append('time', time)
    formData.append('video', sessionVideo)
    formData.append('free', isSessionFree)
    if (sessionCourse === "-1") {
      swal({
        title: "لطفا دوره مورد نظر را انتخاب کنید",
        icon: "error",
      });
    }else{
      fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageData.token}`
        },
        body: formData
      }).then(res => {
        if(res.ok) {
          swal({
            title: "جلسه مورد نظر با موفقیت اضافه شد",
            icon: 'success',
            buttons: 'اوکی'
          }).then(() => {
            getAllSessions()
            emptyInputs()
          })
        }
      })
    }
  }

  const emptyInputs = () =>{
    setTitle("")
    setTime("")
    document.getElementById("file").value = ""
    
  }

  const removeSession = sessionID =>{
    swal({
      title: "آیا از حذف جلسه اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "جلسه مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then((result) => {
              getAllSessions();
            });
          }
        });
      }
    });
  }

  return (
    <div>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن جلسه جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title">عنوان جلسه</label>
                <input
                  className={`${!regex.minValue(5, title) && "error"}`}
                  type="text"
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                  placeholder="لطفا نام جلسه را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">مدت زمان جلسه</label>
                <input
                  className={`${!regex.isLength(time) && "error"}`}
                  type="text"
                  value={time}
                  onChange={event => setTime(event.target.value)}
                  placeholder="لطفا مدت زمان جلسه را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select className="select" onChange={event => setSessionCourse(event.target.value)}>
                    <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option value={course._id} key={course._id}>{course.name}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="name input">
                <label className="input-title">فایل جلسه</label>
                <input type="file" id="file" onChange={event => setSessionVideo(event.target.files[0])} />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="bottom-form">
                <div className="condition">
                  <label className="input-title">وضعیت دوره</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>غیر رایگان</span>
                        <input
                          type="radio"
                          value="0"
                          name="condition"
                          checked
                          onInput={(event) =>
                            setIsSessionFree(event.target.value)
                          }
                        />
                      </label>
                    </div>
                    <div className="unavailable">
                      <label>
                        <span>رایگان</span>
                        <input
                          type="radio"
                          value="1"
                          name="condition"
                          onInput={(event) =>
                            setIsSessionFree(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="افزودن" disabled={checkValidForm()} onClick={createSession}/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="جلسات">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>تایم</th>
              <th>دوره</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={session._id}>
                <td>{index + 1}</td>
                <td>{session.title}</td>
                <td>{session.time}</td>
                <td>{session.course.name}</td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={() => removeSession(session._id)}>
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
