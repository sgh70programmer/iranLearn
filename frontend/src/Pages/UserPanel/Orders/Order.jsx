import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Order() {
    const { orderID } = useParams()
    const [order, setOrder] = useState([]);

    useEffect(() =>{
        fetch(`http://localhost:4000/v1/orders/${orderID}`, {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setOrder(data)
            });
    }, [])
  return (
    <div className="col-9">
      <div className="order">
        <table className="order__table">
          <thead className="order__table-header">
            <tr className="order__table-header-list">
              <th className="order__table-header-item">نام دوره</th>
              <th className="order__table-header-item">تاریخ خرید</th>
              <th className="order__table-header-item">وضعیت</th>
              <th className="order__table-header-item"> مبلغ نهایی</th>
             
            </tr>
          </thead>
          <tbody className="order__table-body">
            {order.map(item => <tr key={item._id} className="order__table-body-list">
                <td className="order__table-body-item">
                    {item.course?.name}
                </td>
                <td className="order__table-body-item">{item?.createdAt.slice(0, 10)}</td>
                <td className="order__table-body-item">{item.course?.isComplete? "تکمیل شده": "در حال پرداخت"}</td>
                <td className="order__table-body-item">
                    {item?.price}
                </td>
                
                <td className="order__table-body-item">
                  <Link className="order__table-body-btn" to="/my-account/orders">
                    صفحه سفارش ها
                  </Link>
                </td>
              </tr>)}
           
              
           
          </tbody>
        </table>
      </div>
    </div>
  )
}
