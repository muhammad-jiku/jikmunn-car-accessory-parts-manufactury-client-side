import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import auth from '../../../../firebase.init';
import Spinner from '../../../Shared/Spinner/Spinner';
import DeleteOrder from '../../DeleteOrder/DeleteOrder';
import AllOrderRow from './AllOrderRow';

const ManageAllOrders = () => {
  const [confirmDeleteOrderModal, setConfirmDeleteOrderModal] = useState(null);

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
      {orders?.length === 0 ? (
        <h1 className="text-center text-3xl text-red-500 my-6">
          Nothing is order yet
        </h1>
      ) : (
        <>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th
                    style={{ backgroundColor: '#F3EEEE', color: 'black' }}
                  ></th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Order
                  </th>
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
                    Status
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders
                  ?.slice(0)
                  ?.reverse()
                  ?.map((order, idx) => (
                    <AllOrderRow
                      key={order?._id}
                      order={order}
                      idx={idx}
                      setConfirmDeleteOrderModal={setConfirmDeleteOrderModal}
                      refetch={refetch}
                    />
                  ))}
              </tbody>
            </table>
          </div>{' '}
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
};

export default ManageAllOrders;
