import React, { useEffect } from 'react';
import googleLogo from '../../../Images/google.png';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../../customHooks/useToken/useToken';

function SocialSignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  let from = location.state?.from?.pathname || '/';

  const [token] = useToken(user);

  // if (error) {
  //   return (
  //     <div>
  //       <p>Error: {error.message}</p>
  //     </div>
  //   );
  // }
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  useEffect(() => {
    if (token) return navigate(from, { replace: true });
  }, [token, navigate, from]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };
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
}

export default SocialSignIn;
