import React from 'react';

function OrderRow({ order, idx, setConfirmDeleteOrderModal }) {
  const { _id, orderId, orderName, quantity, price, user, address } = order;

  // const handleDelete = (email) => {
  //   fetch(`http://localhost:5000/order/${email}`, {
  //     method: 'DELETE'
  //   });
  // }

  return (
    <tr>
      <th>{idx + 1}</th>
      {/* <th>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={img} alt={name} />
          </div>

        </div>
      </th> */}
      <th>
        {orderName}
        {/* <span className="badge badge-ghost badge-sm">
          Desktop Support Technician
        </span> */}
      </th>
      <th>{quantity}</th>
      <th>{price}</th>
      <th>{user}</th>
      <th>{address}</th>
      <th>
        <label
          // htmlFor="confirm-modal"
          className="btn btn-success text-white font-bold mr-2"
          //   onClick={() => setConfirmDelteModal(doctor)}
        >
          Pay
        </label>
        <label
          htmlFor="confirm-modal"
          className="btn btn-error text-white font-bold"
          onClick={() => setConfirmDeleteOrderModal(order)}
        >
          Cancel
        </label>
      </th>
    </tr>
  );
}

export default OrderRow;
