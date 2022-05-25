import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  useAuthState,
  useSendEmailVerification,
} from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';
import Spinner from '../../Shared/Spinner/Spinner';

function RequiredAuth({ children }) {
  const location = useLocation();

  const [user, loading] = useAuthState(auth);
  const [sendEmailVerification, sending] = useSendEmailVerification(auth);

  const handleEmailVerification = async () => {
    await sendEmailVerification();
    toast.success('Email Verification message is sent to your email');
  };

  if (loading || sending) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (
    user?.providerData[0]?.providerId === 'password' &&
    !user?.emailVerified
  ) {
    return (
      <div className="hero min-h-screen bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold text-red-700">
              Your email is not verified
            </h1>
            <h1 className="text-xl font-bold py-4">
              Please verify your email address
            </h1>
            <button
              className="btn btn-primary text-white uppercase font-bold bg-gradient-to-r from-secondary to-primary cursor-pointer"
              onClick={handleEmailVerification}
            >
              Send Verification Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default RequiredAuth;
