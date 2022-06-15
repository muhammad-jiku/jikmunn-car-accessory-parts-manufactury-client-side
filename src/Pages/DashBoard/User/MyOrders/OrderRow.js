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
      <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>{idx + 1}</th>
      <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
        {orderName}
      </th>
      <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>{quantity}</th>
      <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>{price}</th>
      <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>{user}</th>
      <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>{address}</th>
      <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
        {paid ? (
          <>
            <div
              className="uppercase text-success font-bold"
              style={{ backgroundColor: '#F3EEEE', color: 'black' }}
            >
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
