import React, { useEffect, useState } from 'react';
import AdminRow from './AdminRow';

function MakeAdmin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);
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
