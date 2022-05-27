import React from 'react';

function OrderRow({ order, idx }) {
  const { _id, orderId, orderName, quantity, price, user, address } = order;

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
          htmlFor="delete-modal"
          className="btn btn-error text-white font-bold"
          //   onClick={() => setConfirmDelteModal(doctor)}
        >
          Delete
        </label>
      </th>
    </tr>
  );
}

export default OrderRow;
