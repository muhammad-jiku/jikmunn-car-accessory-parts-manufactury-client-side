import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../../firebase.init';
import OrderRow from './OrderRow';
import Spinner from '../../../Shared/Spinner/Spinner';
import ConfirmDeleteOrderModal from '../ConfirmDeleteOrderModal/ConfirmDeleteOrderModal';

function MyOrders() {
  const [user] = useAuthState(auth);

  const [confirmDeleteOrderModal, setConfirmDeleteOrderModal] = useState(null);
  // const [myOrders, setMyOrders] = useState([]);
  // useEffect(() => {
  //   fetch(`http://localhost:5000/order?user=${user?.email}`, {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log('res ', res);
  //       if (res.status === 401 || res.status === 403) {
  //         signOut(auth);
  //         localStorage?.removeItem('accessToken');
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setMyOrders(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [user]);

  const {
    data: myOrders,
    isLoading,
    refetch,
  } = useQuery(['myOrders', user], () =>
    fetch(`http://localhost:5000/order?user=${user?.email}`, {
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
      {console.log(myOrders)}
      {myOrders?.length === 0 ? (
        <h1 className="text-center text-2xl text-red-600 my-6">
          You did not order anything yet!
        </h1>
      ) : (
        <>
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
                {myOrders
                  ?.slice(0)
                  ?.reverse()
                  ?.map((order, idx) => (
                    <OrderRow
                      key={order?._id}
                      order={order}
                      idx={idx}
                      // refetch={refetch}
                      setConfirmDeleteOrderModal={setConfirmDeleteOrderModal}
                    />
                  ))}
              </tbody>
            </table>
          </div>
          {confirmDeleteOrderModal && (
            <ConfirmDeleteOrderModal
              refetch={refetch}
              confirmDeleteOrderModal={confirmDeleteOrderModal}
              setConfirmDeleteOrderModal={setConfirmDeleteOrderModal}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MyOrders;
