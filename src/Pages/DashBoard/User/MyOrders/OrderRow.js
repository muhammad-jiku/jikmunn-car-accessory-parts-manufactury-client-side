import React from 'react';
import { Link } from 'react-router-dom';

const OrderRow = ({ order, idx, setConfirmDeleteOrderModal }) => {
  const {
    _id,
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
      <th>{orderName}</th>
      <th>{quantity}</th>
      <th>{price}</th>
      <th>{user}</th>
      <th>{address}</th>
      <th>
        {paid ? (
          <>
            <div className="uppercase text-success font-bold">
              <span className="mr-2">PAid</span>
              <span className="text-xs text-black">{transactionId}</span>
            </div>
          </>
        ) : (
          <>
            <Link to={`/dashboard/payment/${_id}`}>
              <button className="btn btn-success text-white font-bold mr-2">
                Pay
              </button>
            </Link>
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

export default OrderRow;
