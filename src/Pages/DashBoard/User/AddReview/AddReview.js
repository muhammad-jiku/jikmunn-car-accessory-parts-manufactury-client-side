import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const AddReview = () => {
  const [user] = useAuthState(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const onSubmit = () => {
    const displayName = watch('displayName').toUpperCase();
    const rating = parseInt(watch('rating'));
    const review = watch('review');
    const img = watch('img');

    const reviews = {
      displayName: displayName,
      rating: rating,
      review: review,
      img: img,
    };

    fetch(`https://jikmunn-carmania.herokuapp.com/reviews`, {
      method: 'POST',
      headers: {
        //  authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(reviews),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.insertedId) {
          toast.success('Your review successfully added');
          reset();
        } else {
          toast.error('Failed to add Your review');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container mx-auto px-4 lg:px-64 card bg-base-100">
        <div className="card-body">
          {' '}
          <h1 className="text-2xl text-center">Add Review</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-primary font-bold">Name</span>
              </label>
              <input
                type="text"
                value={user?.displayName}
                className="input input-bordered input-primary"
                {...register('displayName')}
                readOnly
                required
              />
              <p className="text-red-500 font-semibold">
                {errors?.displayName?.type === 'required' && (
                  <span>{errors?.displayName?.message}</span>
                )}
              </p>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-primary font-bold">
                  Rating
                </span>
              </label>
              <input
                type="number"
                placeholder="rating"
                className="input input-bordered input-primary"
                {...register('rating', {
                  required: {
                    value: true,
                    message: 'Rating is required',
                  },
                  min: {
                    value: 1,
                    message: `You can not rate below 1 star`,
                  },
                  max: {
                    value: 5,
                    message: `You can not rate above 5 star`,
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.rating?.type === 'required' && (
                  <span>{errors?.rating?.message}</span>
                )}
                {errors.rating?.type === 'min' && (
                  <span>{errors?.rating?.message}</span>
                )}
                {errors.rating?.type === 'max' && (
                  <span>{errors?.rating?.message}</span>
                )}
              </p>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-primary font-bold">
                  Review
                </span>
              </label>
              <input
                type="text"
                placeholder="review"
                className="input input-bordered input-primary"
                {...register('review', {
                  required: {
                    value: true,
                    message: 'Review is required',
                  },
                  maxLength: {
                    value: 250,
                    message: 'Review can not be more than 250 letters',
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.review?.type === 'required' && (
                  <span>{errors?.review?.message}</span>
                )}
                {errors?.review?.type === 'maxLength' && (
                  <span>{errors?.review?.message}</span>
                )}
              </p>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-primary font-bold">Image</span>
              </label>
              <input
                type="text"
                defaultValue={
                  user?.photoURL || 'https://i.ibb.co/mF39255/icon-256x256.png'
                }
                className="input input-bordered input-primary"
                {...register('img', {
                  required: { value: true, message: 'Image is required' },
                })}
                readOnly
                required
              />
              <p className="text-red-500 font-semibold">
                {errors?.img?.type === 'required' && (
                  <span>{errors?.img?.message}</span>
                )}
              </p>
            </div>
            <div className="form-control mt-6">
              <input
                type="submit"
                className="btn btn-primary text-white uppercase"
                value="Add Review"
              />{' '}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
