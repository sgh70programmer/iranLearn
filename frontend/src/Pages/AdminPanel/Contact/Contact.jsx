import React, { useEffect, useState } from "react";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Contact() {

  const [contacts, setContacts] = useState([])
  const localStorageData = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    getAllContacnts()
  }, [])

  function getAllContacnts() {
    fetch("http://localhost:4000/v1/contact")
      .then((res) => res.json())
      .then((allContacts) => {
        setContacts(allContacts);
      });
  }


  const showContactBody = (body) => {
    swal({
      title: body,
      button: "اوکی"
    })
  }

  const sendAnswerToUser = (contactEmail) => {
    swal({
      title: "متن پاسخ را وارد کنید",
      content: "input",
      button: "ارسال ایمیل"
    }).then(value => {
      const anwserInfo = {
        email: contactEmail,
        answer: value
      }
      fetch("http://localhost:4000/v1/contact/answer", {
        method: "post",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${localStorageData.token}`
        },
        body: JSON.stringify(anwserInfo)
      })
        .then(res => {
          if (res.ok) {
            getAllContacnts()
            return res.json()
          }
        })
        .then(result => {})
    })
  }

  const removeContact = (contactID) => {
    
    swal({
      title: "آیا از حذف پیغام اطمینان داری؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/contact/${contactID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "پیغام مورد نظر با موفقیت حذف شد",
              icon: "success",
              buttons: "اوکی",
            }).then(() => {
              getAllContacnts();
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <DataTable title="پیغام‌ها">
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>حذف</th>
              <th>پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr>
                <td className={contact.answer?"answer-contact":"no-answer-contact"}>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn" onClick={() => showContactBody(contact.body)}>
                    مشاهده پیغام
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-primary edit-btn" onClick={() => sendAnswerToUser(contact.email)}>
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger delete-btn"
                    onClick={() => removeContact(contact._id)}
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
