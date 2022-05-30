import React from 'react';
import { toast } from 'react-toastify';

const AllOrderRow = ({ order, idx, setConfirmDeleteOrderModal, refetch }) => {
  const {
    _id,
    status,
    orderName,
    quantity,
    price,
    user,
    address,
    paid,
    transactionId,
  } = order;

  const shipOrder = () => {
    fetch(`https://jikmunn-carmania.herokuapp.com/order/${_id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error(`${orderName} is failed to ship!`);
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data?.modifiedCount > 0) {
          refetch();
          toast.success(`${orderName} is successfully shipped!`);
        }
      })
      .catch((err) => console.log(err));
  };

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
            {status === 'shipped' && (
              <button className="btn font-bold uppercase text-white" disabled>
                {status}
              </button>
            )}
            {status === 'pending' && (
              <button
                className="btn btn-success text-white font-bold mr-2"
                onClick={shipOrder}
              >
                Ship
              </button>
            )}
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
