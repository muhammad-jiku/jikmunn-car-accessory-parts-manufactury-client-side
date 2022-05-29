import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const UpdateProfileModal = ({ refetch, updateProfile, setUpdateProfile }) => {
  const [user] = useAuthState(auth);

  console.log(updateProfile);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
  } = useForm();

  const onSubmit = () => {
    // e.preventDefault();
    // console.log(data);
    const displayName = watch('displayName').toUpperCase();
    const email = watch('email');
    const education = watch('education');
    const phone = watch('phone');
    const location = watch('location');
    const linkedIn = watch('linkedIn');
    console.log({
      displayName,
      email,
      location,
      phone,
      linkedIn,
      education,
    });

    const updateProfile = {
      displayName: displayName,
      email: email,
      location: location,
      phone: phone,
      linkedIn: linkedIn,
      education: education,
    };

    fetch(`https://jikmunn-carmania.herokuapp.com/user/${user?.email}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updateProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success(`Profile updated successsfully`);
        setUpdateProfile(null);
        refetch();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input type="checkbox" id="update-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="update-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-2xl text-secondary text-center p-4">
            Your profile
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              {/* <label className="label">
                <span className="label-text text-primary font-bold">Name</span>
              </label> */}
              <input
                type="text"
                // placeholder="Name"
                // defaultValue={user?.displayName}
                value={user?.displayName}
                className="input input-bordered input-primary"
                {...register('displayName', {
                  // required: {
                  //   value: true,
                  //   message: 'Name is required',
                  // },
                  // maxLength: {
                  //   value: 30,
                  //   message: 'Name can not be more than 30 letters',
                  // },
                })}
                readOnly
                required
                // disabled
              />
              {/* <p className="text-red-500 font-semibold">
                {errors?.displayName?.type === 'required' && (
                  <span>{errors?.displayName?.message}</span>
                )}
                {errors?.displayName?.type === 'maxLength' && (
                  <span>{errors?.displayName?.message}</span>
                )}
              </p> */}
            </div>
            <div className="form-control mb-4">
              {/* <label className="label">
                <span className="label-text text-primary font-bold">Email</span>
              </label> */}
              <input
                type="email"
                // placeholder="email"
                // defaultValue={user?.email}
                value={user?.email}
                className="input input-bordered input-primary"
                {...register('email', {
                  // required: {
                  //   value: true,
                  //   message: 'Email is required',
                  // },
                  // pattern: {
                  //   value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  //   message: 'Invalid Email',
                  // },
                })}
                readOnly
                required
                // disabled
              />
              {/* <p className="text-red-500 font-semibold">
                {errors.email?.type === 'required' && (
                  <span>{errors?.email?.message}</span>
                )}
                {errors.email?.type === 'pattern' && (
                  <span>{errors?.email?.message}</span>
                )}
              </p> */}
            </div>
            <div className="form-control mb-4">
              {/* <label className="label">
                <span className="label-text text-primary font-bold">
                  Name
                </span>
              </label> */}
              <input
                type="text"
                placeholder="Education"
                className="input input-bordered input-primary"
                {...register('education', {
                  required: {
                    value: true,
                    message: 'Education is required',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Education can not be more than 30 letters',
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.education?.type === 'required' && (
                  <span>{errors?.education?.message}</span>
                )}
                {errors.education?.type === 'maxLength' && (
                  <span>{errors?.education?.message}</span>
                )}
              </p>{' '}
            </div>
            <div className="form-control mb-4">
              {/* <label className="label">
                <span className="label-text text-primary font-bold">
                  Name
                </span>
              </label> */}
              <input
                type="tel"
                placeholder="Phone"
                className="input input-bordered input-primary"
                {...register('phone', {
                  required: {
                    value: true,
                    message: 'Phone Number is required',
                  },
                  // minLength: {
                  //   value: 30,
                  //   message: 'Address can not be more than 30 letters',
                  // },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.phone?.type === 'required' && (
                  <span>{errors?.phone?.message}</span>
                )}
                {/* {errors.address?.type === 'minLength' && (
                  <span>{errors?.address?.message}</span>
                )} */}
              </p>{' '}
            </div>
            <div className="form-control mb-4">
              {/* <label className="label">
                <span className="label-text text-primary font-bold">Name</span>
              </label> */}
              <input
                type="text"
                // defaultValue={itemName}
                // value={itemName}
                placeholder="location"
                className="input input-bordered input-primary"
                {...register('location', {
                  required: {
                    value: true,
                    message: 'location is required',
                  },
                })}
                // readOnly
                required
                // disabled
              />
              <p className="text-red-500 font-semibold">
                {errors?.location?.type === 'required' && (
                  <span>{errors?.location?.message}</span>
                )}
                {/* {errors?.displayName?.type === 'maxLength' && (
                  <span>{errors?.displayName?.message}</span>
                )} */}
              </p>
            </div>
            <div className="form-control mb-4">
              {/* <label className="label">
                <span className="label-text text-primary font-bold">
                  Name
                </span>
              </label> */}
              <input
                type="text"
                placeholder="linkedIn"
                // defaultValue={minQuantity}
                className="input input-bordered input-primary"
                {...register('linkedIn', {
                  required: {
                    value: true,
                    message: 'linkedIn is required',
                  },
                  //   min: {
                  //     value: minQuantity,
                  //     message: `You can not order below ${minQuantity} pcs`,
                  //   },
                  //   max: {
                  //     value: avaialableQuantity,
                  //     message: `You can not order above ${avaialableQuantity} pcs`,
                  //   },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.linkedIn?.type === 'required' && (
                  <span>{errors?.linkedIn?.message}</span>
                )}
                {/* {errors.quantity?.type === 'min' && (
                  <span>{errors?.quantity?.message}</span>
                )}
                {errors.quantity?.type === 'max' && (
                  <span>{errors?.quantity?.message}</span>
                )} */}
              </p>{' '}
            </div>

            <div className="form-control mt-6">
              {/* {errorMessage} */}
              <input
                type="submit"
                className="btn btn-primary text-white uppercase"
                value="update"
              />{' '}
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
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
