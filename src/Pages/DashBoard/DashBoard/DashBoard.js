import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function DashBoard() {
  return (
    <div className="drawer drawer-mobile">
      <input
        id="dashboard-drawer-sidebar"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content bg-base-300">
        <h1 className="text-2xl uppercase text-primary">
          here is your dashboard
        </h1>
        {/* <!-- Page content here --> */}
        <Outlet />
        {/* <label
          htmlFor="dashboard-drawer-sidebar"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label> */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="dashboard-drawer-sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            {' '}
            <Link to="/dashboard">My Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/myorders">My Orders</Link>
          </li>
          <li>
            <Link to="/dashboard/addreview">Add Review</Link>
          </li>
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
        </ul>
      </div>
    </div>
  );
}

export default DashBoard;
