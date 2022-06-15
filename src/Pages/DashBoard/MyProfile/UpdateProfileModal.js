import React from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';

const UpdateProfileModal = ({ refetch, updateProfile, setUpdateProfile }) => {
  const [user] = useAuthState(auth);
  const [updatePro, updating] = useUpdateProfile(auth);

  // console.log(updateProfile);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = () => {
    const displayName = watch('displayName').toUpperCase();
    const email = watch('email');
    const education = watch('education');
    const phone = watch('phone');
    const location = watch('location');
    const linkedIn = watch('linkedIn');
    const img = watch('img');

    const updateProfile = {
      displayName: displayName,
      email: email,
      location: location,
      phone: phone,
      linkedIn: linkedIn,
      education: education,
      img: img,
    };

    fetch(`https://jikmunn-carmania.herokuapp.com/user/${user?.email}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(updateProfile),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        await updatePro({ photoURL: img });
        toast.success(`Profile updated successsfully`);
        setUpdateProfile(null);
        refetch();
      })
      .catch((err) => console.log(err));
  };

  if (updating) return <Spinner />;

  return (
    <div>
      <input type="checkbox" id="update-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle z-10">
        <div
          className="modal-box relative"
          style={{ backgroundColor: '#F3EEEE', color: 'black' }}
        >
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
              <input
                type="text"
                value={user?.displayName}
                className="input input-bordered input-primary"
                {...register('displayName')}
                readOnly
                required
                style={{ backgroundColor: '#F3EEEE', color: 'black' }}
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="email"
                value={user?.email}
                className="input input-bordered input-primary"
                {...register('email')}
                readOnly
                required
                style={{ backgroundColor: '#F3EEEE', color: 'black' }}
              />
            </div>
            <div className="form-control mb-4">
              <input
                type="text"
                defaultValue={updateProfile?.education || 'Education'}
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
                style={{ backgroundColor: '#F3EEEE', color: 'black' }}
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
              <input
                type="tel"
                defaultValue={updateProfile?.phone || 'Phone'}
                className="input input-bordered input-primary"
                {...register('phone', {
                  required: {
                    value: true,
                    message: 'Phone Number is required',
                  },
                })}
                style={{ backgroundColor: '#F3EEEE', color: 'black' }}
              />
              <p className="text-red-500 font-semibold">
                {errors.phone?.type === 'required' && (
                  <span>{errors?.phone?.message}</span>
                )}
              </p>{' '}
            </div>
            <div className="form-control mb-4">
              <input
                type="text"
                defaultValue={updateProfile?.location || 'location'}
                className="input input-bordered input-primary"
                {...register('location', {
                  required: {
                    value: true,
                    message: 'location is required',
                  },
                })}
                style={{ backgroundColor: '#F3EEEE', color: 'black' }}
              />
              <p className="text-red-500 font-semibold">
                {errors?.location?.type === 'required' && (
                  <span>{errors?.location?.message}</span>
                )}
              </p>
            </div>
            <div className="form-control mb-4">
              <input
                type="text"
                defaultValue={updateProfile?.linkedIn || 'linkedIn'}
                className="input input-bordered input-primary"
                {...register('linkedIn', {
                  required: {
                    value: true,
                    message: 'linkedIn is required',
                  },
                })}
                style={{ backgroundColor: '#F3EEEE', color: 'black' }}
              />
              <p className="text-red-500 font-semibold">
                {errors.linkedIn?.type === 'required' && (
                  <span>{errors?.linkedIn?.message}</span>
                )}
              </p>{' '}
            </div>
            <div className="form-control mb-4">
              <input
                type="text"
                defaultValue={
                  user?.photoURL || 'https://i.ibb.co/mF39255/icon-256x256.png'
                }
                className="input input-bordered input-primary"
                {...register('img', {
                  required: { value: true, message: 'Image is required' },
                })}
                style={{ backgroundColor: '#F3EEEE', color: 'black' }}
              />
              <p className="text-red-500 font-semibold">
                {errors.img?.type === 'required' && (
                  <span>{errors?.img?.message}</span>
                )}
              </p>
            </div>

            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-primary text-white uppercase"
                value="update"
              />{' '}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
