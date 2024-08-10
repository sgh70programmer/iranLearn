import React, { useEffect, useState } from "react";
import regex from "../../../validators/regex";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function Offs() {
  const [courses, setCourses] = useState([]);
  const [offs, setOffs] = useState([]);
  const [offCourse, setOffCourse] = useState("-1");
  const [code, setCode] = useState("")
  const [percent, setPercent] = useState("")
  const [max, setMax] = useState("")


  useEffect(() => {
    getAllOffs()
    fetch(`http://localhost:4000/v1/courses`)
      .then((res) => res.json())
      .then((allCourses) => setCourses(allCourses));
  }, []);
  function getAllOffs() {
    fetch(`http://localhost:4000/v1/offs`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
          }`,
      },
    })
      .then((res) => res.json())
      .then((allOffs) => {
        setOffs(allOffs);
      });
  }

  const checkValidForm = () => {
    if (regex.minValue(5, code) && regex.isLength(percent) && regex.isLength(max)) {
      return false
    } else {
      return true
    }
  }

  const createOff = (event) => {
    event.preventDefault();

    const newOffInfos = {
      code,
      percent,
      course: offCourse,
      max,
    };

    fetch(`http://localhost:4000/v1/offs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
          }`,
      },
      body: JSON.stringify(newOffInfos),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: "کد تخفیف با موفقیت ایجاد شد",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          getAllOffs();
          emptyInputs()
        });
      }
    });
  };

  const emptyInputs = () => {

    setCode("")
    setMax("")
    setPercent("")

  }

  const removeOff = (offID) => {
    swal({
      title: "آیا از حذف کد تخفیف اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
      dangerMode: true
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/offs/${offID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
              }`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "کد تخفیف مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllOffs();
            });
          }
        });
      }
    });
  };


  return (
    <div>
      <div className="container-fluid" id="home-content">
        <div className="container">
          <div className="home-title">
            <span>افزودن کد تخفیف جدید</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="price input">
                <label className="input-title">کد تخفیف</label>
                <input
                  className={`${!regex.minValue(5, code) && "error"}`}
                  type="text"
                  value={code}
                  onChange={event => setCode(event.target.value)}
                  placeholder="لطفا کد تخفیف را وارد نمایید"
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="price input">
                <label className="input-title">درصد تخفیف</label>
                <input
                  className={`${!regex.isLength(percent) && "error"}`}
                  type="text"
                  value={percent}
                  onChange={event => setPercent(event.target.value)}
                  placeholder="لطفا درصد تخفیف را وارد نمایید"
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="name input">
                <label className="input-title">حداکثر استفاده</label>
                <input
                  className={`${!regex.isLength(max) && "error"}`}
                  type="text"
                  value={max}
                  onChange={event => setMax(event.target.value)}
                  placeholder="حداکثر استفاده از کد تخفیف"
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="price input">
                <label className="input-title" style={{ display: "block" }}>
                  دوره
                </label>
                <select
                  className="select"
                  onChange={(event) => setOffCourse(event.target.value)}
                >
                  <option value="-1">دوره مدنظر را انتخاب کنید</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}

                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input type="submit" value="افزودن" disabled={checkValidForm()} onClick={createOff} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title="کد های تخفیف">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کد</th>
              <th>درصد</th>
              <th>حداکثر استفاده</th>
              <th>دفعات استفاده</th>
              <th>سازنده</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {offs.map((off, index) => (
              <tr key={off._id}>
                <td>{index + 1}</td>
                <td>{off.code}</td>
                <td>{off.percent}</td>
                <td>{off.max}</td>
                <td>{off.uses}</td>
                <td>{off.creator}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeOff(off._id)}
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
  );
}
