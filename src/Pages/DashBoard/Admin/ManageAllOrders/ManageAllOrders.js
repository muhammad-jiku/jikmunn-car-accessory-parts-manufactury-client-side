import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import auth from '../../../../firebase.init';
import Spinner from '../../../Shared/Spinner/Spinner';
import ConfirmDeleteOrderModal from '../../ConfirmDeleteOrderModal/ConfirmDeleteOrderModal';
import AllOrderRow from './AllOrderRow';

function ManageAllOrders() {
  // const [orders, setOrders] = useState([]);
  const [confirmDeleteOrderModal, setConfirmDeleteOrderModal] = useState(null);

  // useEffect(() => {
  //   fetch('https://jikmunn-carmania.herokuapp.com/orders')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setOrders(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery('orders', () =>
    fetch(`https://jikmunn-carmania.herokuapp.com/orders`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    }).then((res) => {
      console.log('res ', res);
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage?.removeItem('accessToken');
      }
      return res.json();
    })
  );

  if (isLoading) return <Spinner />;
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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {console.log(orders)}
            {orders?.map((order, idx) => (
              <AllOrderRow
                key={order?._id}
                order={order}
                idx={idx}
                setConfirmDeleteOrderModal={setConfirmDeleteOrderModal}
              />
            ))}
          </tbody>
        </table>
      </div>{' '}
      {confirmDeleteOrderModal && (
        <ConfirmDeleteOrderModal
          refetch={refetch}
          confirmDeleteOrderModal={confirmDeleteOrderModal}
          setConfirmDeleteOrderModal={setConfirmDeleteOrderModal}
        />
      )}
    </div>
  );
}

export default ManageAllOrders;
