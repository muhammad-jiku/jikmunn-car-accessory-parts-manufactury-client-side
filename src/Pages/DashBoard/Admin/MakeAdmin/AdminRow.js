import React from 'react';
import { toast } from 'react-toastify';

function AdminRow({ user, idx, refetch }) {
  const { _id, email, role } = user;
  const makeAdmin = () => {
    fetch(`https://jikmunn-carmania.herokuapp.com/user/admin/${email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error('Failed to make an admin');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data?.modifiedCount > 0) {
          refetch();
          toast.success(`${email} successfully included as admin`);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <tr>
      <th>{idx + 1}</th>
      {/* <th>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={img} alt={itemName} />
          </div>
        </div>
      </th> */}
      {/* <th>
        {itemName}
      </th> */}
      <th>{email}</th>
      {/* <th>{address}</th> */}
      <th>
        {role === 'admin' ? (
          <>
            <button className="btn font-bold uppercase text-white" disabled>
              Admin
            </button>{' '}
            <button className="btn font-bold uppercase text-white ml-2">
              Remove Admin
            </button>
          </>
        ) : (
          <button
            className="btn font-bold uppercase text-white"
            onClick={makeAdmin}
          >
            Make Admin
          </button>
        )}
      </th>
    </tr>
  );
}

export default AdminRow;
