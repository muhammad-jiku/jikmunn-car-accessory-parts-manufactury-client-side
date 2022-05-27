import React, { useEffect } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../../customHooks/useToken/useToken';
import auth from '../../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';
import SocialSignIn from '../SocialSignIn/SocialSignIn';

function SignUp() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [createUserWithEmailAndPassword, user, loading, signUpError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  let errorMessage;
  let from = location.state?.from?.pathname || '/';

  const [token] = useToken(user);

  useEffect(() => {
    if (token) {
      console.log(user);
      navigate(from, { replace: true });
    }
  }, [token, user, navigate, from]);

  if (loading || updating) return <Spinner />;

  // const handleSignUp = async () => {
  //   await createUserWithEmailAndPassword();
  // };

  const onSubmit = async () => {
    // console.log(data);
    const displayName = watch('displayName').toUpperCase();
    const email = watch('email');
    const password = watch('password');
    console.log(email, password);

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: displayName });
    console.log('Updated name', displayName);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
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
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered input-primary"
                  {...register('displayName', {
                    required: {
                      value: true,
                      message: 'Name is required',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Name can not be more than 20 letters',
                    },
                  })}
                />
                <p className="text-red-500 font-semibold">
                  {errors?.displayName?.type === 'required' && (
                    <span>{errors?.displayName?.message}</span>
                  )}
                  {errors?.displayName?.type === 'maxLength' && (
                    <span>{errors?.displayName?.message}</span>
                  )}
                </p>
              </div>

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
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                  </a>
                </label> */}
              </div>

              <div className="form-control mt-6">
                {errorMessage}
                <input
                  type="submit"
                  className="btn btn-primary text-white uppercase"
                  value="Sign Up"
                />{' '}
                <p className="text-center font-bold">
                  {/* <a href="#" className="label-text-alt link link-hover"> */}
                  Already have an account?{' '}
                  <span
                    className="text-primary cursor-pointer"
                    onClick={() => navigate('/signin')}
                  >
                    {' '}
                    sign in
                  </span>
                  {/* </a> */}
                </p>
              </div>
            </form>
            {/* <div className="form-control mt-6">
              <button className="btn btn-primary" onClick={handleSignUp}>
                Sign up
              </button>
            </div> */}
            <div className="divider">OR</div>
            <SocialSignIn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
