import React, { useEffect } from 'react';
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import SocialSignIn from '../SocialSignIn/SocialSignIn';
import Spinner from '../../Shared/Spinner/Spinner';
import useToken from '../../../customHooks/useToken/useToken';

function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [signInWithEmailAndPassword, user, loading, signInerror] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);

  let errorMessage;
  let from = location.state?.from?.pathname || '/';

  const [token] = useToken(user);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  if (loading || sending) return <Spinner />;

  const onSubmit = async () => {
    const email = watch('email');
    const password = watch('password');
    console.log(email, password);
    await signInWithEmailAndPassword(email, password);
  };

  const handlePasswordReset = async () => {
    const email = watch('email');
    console.log(email);
    if (email) {
      await sendPasswordResetEmail(email);
      toast.success('Reset email message is sent');
      return;
    } else {
      toast.error('Insert your email address please!');
      return;
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign in now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-primary font-bold">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered input-primary"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Email is required',
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: 'Invalid Email',
                    },
                  })}
                />
                <p className="text-red-500 font-semibold">
                  {errors.email?.type === 'required' && (
                    <span>{errors?.email?.message}</span>
                  )}
                  {errors.email?.type === 'pattern' && (
                    <span>{errors?.email?.message}</span>
                  )}
                </p>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-primary font-bold">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered input-primary"
                  {...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                    minLength: {
                      value: 6,
                      message: 'Password must be at least six letters',
                    },
                  })}
                />
                <p className="text-red-500 font-semibold">
                  {errors.password?.type === 'required' && (
                    <span>{errors?.password?.message}</span>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <span>{errors?.password?.message}</span>
                  )}
                </p>{' '}
                <p className="font-bold">
                  Forget password?
                  <span
                    className="text-primary cursor-pointer"
                    onClick={handlePasswordReset}
                  >
                    {' '}
                    Reset Password
                  </span>
                </p>
              </div>
              <div className="form-control mt-6">
                {errorMessage}
                <input
                  type="submit"
                  className="btn btn-primary text-white uppercase"
                  value="Sign In"
                />{' '}
                <p className="text-center font-bold">
                  New to CARMANIA?{' '}
                  <span
                    className="text-primary cursor-pointer"
                    onClick={() => navigate('/signup')}
                  >
                    {' '}
                    sign up
                  </span>
                </p>
              </div>
              {/* <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  onClick={handleSignIn}
                >
                  Sign in
                </button>
              </div>{' '} */}
            </form>
            <div className="divider">OR</div>
            <SocialSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
