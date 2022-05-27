import React, { useEffect, useState } from 'react';
import OrderRow from '../../User/MyOrders/OrderRow';

function ManageAllOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/orders')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      ManageAllOrders
      {console.log(orders)}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Order</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Owner</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {orders?.map((order, idx) => (
              <OrderRow
                key={order?._id}
                order={order}
                idx={idx}
                // setConfirmDelteModal={setConfirmDelteModal}
              />
            ))}
          </tbody>
        </table>
      </div>{' '}
    </div>
  );
}

export default ManageAllOrders;
