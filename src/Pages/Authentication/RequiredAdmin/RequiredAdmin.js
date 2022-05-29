import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../../customHooks/useAdmin/useAdmin';
import auth from '../../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';

const RequiredAdmin = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [admin, adminLoading] = useAdmin(user);

  let location = useLocation();

  if (loading || adminLoading) {
    return <Spinner />;
  }

  if (!user || !admin) {
    signOut(auth);
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAdmin;
