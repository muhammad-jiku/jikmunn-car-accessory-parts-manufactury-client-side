import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import useAdmin from '../../../customHooks/useAdmin/useAdmin';

function DashBoard() {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  return (
    <div className="drawer drawer-mobile">
      <input
        id="dashboard-drawer-sidebar"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content bg-base-100">
        <h1 className="text-2xl uppercase text-primary mt-4">
          here is {user?.displayName}'s dashboard
        </h1>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer-sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 lg:bg-transparent text-base-content">
          <li>
            {' '}
            <Link to="/dashboard">My Profile</Link>
          </li>
          {admin && (
            <>
              <li>
                <Link to="/dashboard/addcaritem">Add New Car Item</Link>
              </li>
              <li>
                <Link to="/dashboard/managecaritems">Manage Car Items</Link>
              </li>
              <li>
                <Link to="/dashboard/manageallorders">Manage All Orders</Link>
              </li>
              <li>
                <Link to="/dashboard/makeadmin">Make Admin</Link>
              </li>
            </>
          )}

          {!admin && (
            <>
              <li>
                <Link to="/dashboard/myorders">My Orders</Link>
              </li>
              <li>
                <Link to="/dashboard/addreview">Add Review</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DashBoard;
