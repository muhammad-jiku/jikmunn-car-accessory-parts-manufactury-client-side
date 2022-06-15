import React from 'react';
import { useQuery } from 'react-query';
import AdminRow from './AdminRow';
import Spinner from '../../../Shared/Spinner/Spinner';

const MakeAdmin = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery('users', () =>
    fetch('https://jikmunn-carmania.herokuapp.com/users', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) return <Spinner />;
  return (
    <div>
      {users?.length === 0 ? (
        <h1 className="text-center text-3xl text-red-500 my-6">
          No account is created yet
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
                    Email
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, idx) => (
                  <AdminRow
                    key={user?._id}
                    user={user}
                    idx={idx}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>{' '}
        </>
      )}
    </div>
  );
};

export default MakeAdmin;
