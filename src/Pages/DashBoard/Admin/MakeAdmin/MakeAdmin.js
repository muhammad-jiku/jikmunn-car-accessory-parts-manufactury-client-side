import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import AdminRow from './AdminRow';
import Spinner from '../../../Shared/Spinner/Spinner';

function MakeAdmin() {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery('users', () =>
    fetch('http://localhost:5000/users', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:5000/users')
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data))
  //     .catch((err) => console.log(err));
  // }, []);

  if (isLoading) return <Spinner />;
  return (
    <div>
      MakeAdmin
      {console.log(users)}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              {/* <th>Image</th>
              <th>Name</th> */}
              <th>Email</th>
              {/* <th>Address</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {users?.map((user, idx) => (
              <AdminRow
                key={user?._id}
                user={user}
                idx={idx}
                refetch={refetch}
                // setConfirmDelteModal={setConfirmDelteModal}
              />
            ))}
          </tbody>
        </table>
      </div>{' '}
    </div>
  );
}

export default MakeAdmin;
