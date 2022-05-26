import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';

function Header() {
  const [user, loading, error] = useAuthState(auth);

  const signingOut = () => {
    signOut(auth);
    localStorage?.removeItem('accessToken');
  };

  if (loading) {
    return;
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home </Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/car-parts">Accessories</Link>
            </li>
            {user ? (
              <>
                {' '}
                <li className="mr-2 font-bold">
                  <p>
                    {' '}
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-primary"
                      // size="6x"
                    />{' '}
                    {user ? user?.displayName : user?.email}
                  </p>
                </li>
                <li>
                  <button className="btn btn-primary" onClick={signingOut}>
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin">Sign in</Link>
                </li>
                <li>
                  <Link to="/signup">Sign up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          carmania
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to="/">Home </Link>
          </li>

          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/car-parts">Accessories</Link>
          </li>
          {user ? (
            <>
              {' '}
              <li className="mr-2 font-bold">
                <p>
                  {' '}
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-primary"
                    // size="6x"
                  />{' '}
                  {user ? user?.displayName : user?.email}
                </p>
              </li>
              <li>
                <button className="btn btn-primary" onClick={signingOut}>
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">Sign in</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
