import React from 'react';

function AdminRow({ user, idx }) {
  const { _id, email } = user;
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
        <label
          htmlFor="delete-modal"
          className="btn btn-error text-white font-bold"
          //   onClick={() => setConfirmDelteModal(doctor)}
        >
          Delete
        </label>
      </th>
    </tr>
  );
}

export default AdminRow;
