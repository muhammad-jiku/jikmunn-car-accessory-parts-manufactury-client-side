import React from 'react';
import { Link } from 'react-router-dom';

const AllOrderRow = ({ order, idx, setConfirmDeleteOrderModal }) => {
  console.log(order);
  const {
    _id,
    orderId,
    status,
    orderName,
    quantity,
    price,
    user,
    address,
    paid,
    transactionId,
  } = order;

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
        {transactionId ? (
          <>
            <h1 className="text-xs text-success">{status}</h1>
          </>
        ) : (
          <>
            <h1 className="text-xs text-red-500">unpaid</h1>
          </>
        )}
      </th>
      <th>
        {paid ? (
          <>
            <button className="btn btn-success text-white font-bold mr-2">
              Ship
            </button>
          </>
        ) : (
          <>
            <label
              htmlFor="confirm-modal"
              className="btn btn-error text-white font-bold"
              onClick={() => setConfirmDeleteOrderModal(order)}
            >
              Cancel
            </label>
          </>
        )}
      </th>
    </tr>
  );
};

export default AllOrderRow;
