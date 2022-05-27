import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import OrderRow from './OrderRow';

function MyOrders() {
  const [user] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/order?user=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMyOrders(data);
      })
      .catch((err) => console.log(err));
  }, [user]);
  return (
    <div>
      MyOrders
      {console.log(myOrders)}
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
            {myOrders?.map((order, idx) => (
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

export default MyOrders;
