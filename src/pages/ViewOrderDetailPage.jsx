import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';

const ViewOrderDetailPage = () => {
    const firebase = useFirebase();
    const params = useParams();
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        // if(firebase.isBooks)
        firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
    },[]);
    console.log(orders);
    // if(!firebase.isBooks) return <h1>Please Login first</h1>
  return (
    <div className='container mt-3'>
        <h1>Orders</h1>
     {
        orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <h5>Order By: {data.displayName}</h5>
            <h6>Quantity: {data.qty}</h6>
            <p>Email: {data.userEmail}</p>
          </div>
        );
      })}
    </div>
  )
}

export default ViewOrderDetailPage