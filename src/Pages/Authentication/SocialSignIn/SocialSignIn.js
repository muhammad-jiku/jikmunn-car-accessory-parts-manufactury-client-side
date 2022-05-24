import React from 'react';
import googleLogo from '../../../Images/google.png';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

function SocialSignIn() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

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
  // if (user) {
  //   return (
  //     <div>
  //       <p>Signed In User: {user.email}</p>
  //     </div>
  //   );
  // }

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
