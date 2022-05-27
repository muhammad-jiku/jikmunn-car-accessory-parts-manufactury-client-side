import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

function AddReview() {
  const [user] = useAuthState(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const onSubmit = () => {
    const displayName = watch('displayName');
    const rating = parseInt(watch('rating'));
    const review = watch('review');
    // const img = watch('img');

    const reviews = {
      displayName: displayName,
      rating: rating,
      review: review,
      // img: img,
    };

    //  const formData = new FormData();
    //  const image = img[0];
    //  formData.append('image', image);
    //  const url = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;
    //  fetch(url, { method: 'POST', body: formData })
    //  .then((res) => res.json())
    //  .then((result) => {
    //  if (result?.success) {
    //  const img = result?.data?.url;
    //  const reviews = {
    //    displayName:displayName,
    //    rating:rating,
    //    review:review,
    //   //  img: img,
    //  };
    // send accessory details to database
    //  console.log('accessory details ', accessory);
    fetch(`http://localhost:5000/reviews`, {
      method: 'POST',
      headers: {
        //  authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(reviews),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('review ', data);
        if (data?.insertedId) {
          toast.success('Your review successfully added');
          reset();
        } else {
          toast.error('Failed to add Your review');
        }
      })
      .catch((err) => console.log(err));
  };
  //    console.log('image address ', result);
  //  })
  //  .catch((err) => console.log(err));

  // reset();
  //  };
  return (
    <div>
      AddReview
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* doctors name */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-primary font-bold">Name</span>
          </label>
          <input
            type="text"
            value={user?.displayName}
            className="input input-bordered input-primary"
            {...register('displayName', {
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
            readOnly
            required
          />
          <p className="text-red-500 font-semibold">
            {errors?.displayName?.type === 'required' && (
              <span>{errors?.displayName?.message}</span>
            )}
          </p>
        </div>
        {/* doctors email */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-primary font-bold">Email</span>
          </label>
          <input
            type="number"
            placeholder="rating"
            className="input input-bordered input-primary"
            {...register('rating', {
              required: {
                value: true,
                message: 'price is required',
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
        {/* doctors speciality */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-primary font-bold">Email</span>
          </label>
          <input
            type="text"
            placeholder="review"
            className="input input-bordered input-primary"
            {...register('review', {
              required: {
                value: true,
                message: 'review is required',
              },
              maxLength: {
                value: 250,
                message: 'description can not be more than 250 letters',
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
        {/* doctors image */}
        {/* <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-primary font-bold">Image</span>
          </label>
          <input
            type="text"
            value={user?.photoURL}
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
        </div> */}
        {/* submit button */}
        <div className="form-control mt-6">
          {/* {signInError} */}
          <input
            type="submit"
            className="btn btn-primary text-white uppercase"
            value="submit"
          />{' '}
        </div>
      </form>
    </div>
  );
}

export default AddReview;
