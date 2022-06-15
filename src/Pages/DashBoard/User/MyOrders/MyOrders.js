import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../../firebase.init';
import OrderRow from './OrderRow';
import Spinner from '../../../Shared/Spinner/Spinner';
import DeleteOrder from '../../DeleteOrder/DeleteOrder';

function MyOrders() {
  const [user] = useAuthState(auth);

  const [confirmDeleteOrderModal, setConfirmDeleteOrderModal] = useState(null);

  const {
    data: myOrders,
    isLoading,
    refetch,
  } = useQuery(['myOrders', user], () =>
    fetch(`https://jikmunn-carmania.herokuapp.com/order?user=${user?.email}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    }).then((res) => {
      // console.log('res ', res);
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
      {myOrders?.length === 0 ? (
        <h1 className="text-center text-2xl text-red-600 my-6">
          You did not order anything yet!
        </h1>
      ) : (
        <>
          <div
            className="overflow-x-auto w-full"
            style={{ backgroundColor: '#F3EEEE', color: 'black' }}
          >
            <table
              className="table w-full"
              style={{ backgroundColor: '#F3EEEE', color: 'black' }}
            >
              <thead>
                <tr>
                  <th
                    style={{ backgroundColor: '#F3EEEE', color: 'black' }}
                  ></th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Order
                  </th>
                  {/* <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Order
                  </th> */}
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Quantity
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Price
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Owner
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Address
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Actions
                  </th>
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
            <DeleteOrder
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
