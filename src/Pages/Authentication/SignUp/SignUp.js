import React, { useEffect } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useToken from '../../../customHooks/useToken/useToken';
import auth from '../../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';
import SocialSignIn from '../SocialSignIn/SocialSignIn';

const SignUp = () => {
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
  const [updateProfile, updating] = useUpdateProfile(auth);

  let errorMessage;
  let from = location.state?.from?.pathname || '/';

  const [token] = useToken(user);

  useEffect(() => {
    if (token) {
      // console.log(user);
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  useEffect(() => {
    if (signUpError) {
      toast.error('Invalid email or password');
    }
    return;
  }, [signUpError]);

  if (loading || updating) return <Spinner />;

  const onSubmit = async () => {
    const displayName = watch('displayName').toUpperCase();
    const email = watch('email');
    const password = watch('password');

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: displayName });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
          <p className="py-6">
            Welcome to the Carmania. Here you can purchase your choosable car
            part accessory. So, sign up now to start your journey
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
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
                  style={{ backgroundColor: 'white' }}
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
                  style={{ backgroundColor: 'white' }}
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
                  style={{ backgroundColor: 'white' }}
                />
                <p className="text-red-500 font-semibold">
                  {errors.password?.type === 'required' && (
                    <span>{errors?.password?.message}</span>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <span>{errors?.password?.message}</span>
                  )}
                </p>
              </div>

              <div className="form-control mt-6">
                {errorMessage}
                <input
                  type="submit"
                  className="btn btn-primary text-white uppercase"
                  value="Sign Up"
                />{' '}
                <p className="text-center font-bold">
                  Already have an account?{' '}
                  <span
                    className="text-primary cursor-pointer"
                    onClick={() => navigate('/signin')}
                  >
                    {' '}
                    sign in
                  </span>
                </p>
              </div>
            </form>
            <div className="divider">OR</div>
            <SocialSignIn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
