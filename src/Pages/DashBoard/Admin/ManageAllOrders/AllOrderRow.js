import React from 'react';

const AllOrderRow = ({ order, idx, setConfirmDeleteOrderModal }) => {
  const {
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
      <th>{orderName}</th>
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
