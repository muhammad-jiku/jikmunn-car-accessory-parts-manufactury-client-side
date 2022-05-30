import React, { useEffect } from 'react';
import googleLogo from '../../../Images/google.png';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../../customHooks/useToken/useToken';
import Spinner from '../../Shared/Spinner/Spinner';
import { toast } from 'react-toastify';

const SocialSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  let from = location.state?.from?.pathname || '/';

  const [token] = useToken(user);

  useEffect(() => {
    if (token) {
      // console.log(user);
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  useEffect(() => {
    if (error) {
      toast.error('Social sign in failed');
    }
    return;
  }, [error]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <button
        className="btn btn-outline btn-primary w-full"
        onClick={handleGoogleLogin}
      >
        Continue with <img src={googleLogo} alt="" className="ml-2" />{' '}
      </button>
    </div>
  );
};

export default SocialSignIn;
