import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function AddCarItem() {
  const imageApiKey = 'aef40ff4201c7cc59195b859727f7286';
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const onSubmit = () => {
    const itemName = watch('itemName');
    const avaialableQuantity = parseInt(watch('avaialableQuantity'));
    const minQuantity = parseInt(watch('minQuantity'));
    const price = parseInt(watch('price'));
    const description = watch('description');
    const img = watch('img');

    const formData = new FormData();
    const image = img[0];
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${imageApiKey}`;
    fetch(url, { method: 'POST', body: formData })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          const img = result?.data?.url;
          const accessory = {
            itemName: itemName,
            avaialableQuantity: avaialableQuantity,
            minQuantity: minQuantity,
            price: price,
            description: description,
            img: img,
          };
          // send accessory details to database
          console.log('accessory details ', accessory);
          fetch(`https://jikmunn-carmania.herokuapp.com/car-part`, {
            method: 'POST',
            headers: {
              authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
              'content-type': 'application/json',
            },
            body: JSON.stringify(accessory),
          })
            .then((res) => res.json())
            .then((accesso) => {
              console.log('accessory: ', accesso);
              if (accesso?.insertedId) {
                toast.success('New accessory is added');
                reset();
              } else {
                toast.error('Failed to add new accessory');
              }
            })
            .catch((err) => console.log(err));
        }
        console.log('image address ', result);
      })
      .catch((err) => console.log(err));

    // reset();
  };
  return (
    <div>
      AddCarItem
      <div className="container mx-auto px-4 lg:px-64 card bg-base-100">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* doctors name */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-primary font-bold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Accessory"
                className="input input-bordered input-primary"
                {...register('itemName', {
                  required: {
                    value: true,
                    message: 'Accessory Name is required',
                  },
                  maxLength: {
                    value: 35,
                    message: 'Accessory can not be more than 35 letters',
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors?.itemName?.type === 'required' && (
                  <span>{errors?.itemName?.message}</span>
                )}
                {errors?.itemName?.type === 'maxLength' && (
                  <span>{errors?.itemName?.message}</span>
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
                placeholder="price"
                className="input input-bordered input-primary"
                {...register('price', {
                  required: {
                    value: true,
                    message: 'price is required',
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.price?.type === 'required' && (
                  <span>{errors?.price?.message}</span>
                )}
              </p>
            </div>
            {/* doctors speciality */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-primary font-bold">Email</span>
              </label>
              <input
                type="number"
                placeholder="avaialableQuantity"
                className="input input-bordered input-primary"
                {...register('avaialableQuantity', {
                  required: {
                    value: true,
                    message: 'avaialableQuantity is required',
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.avaialableQuantity?.type === 'required' && (
                  <span>{errors?.avaialableQuantity?.message}</span>
                )}
              </p>
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-primary font-bold">Email</span>
              </label>
              <input
                type="number"
                placeholder="minQuantity"
                className="input input-bordered input-primary"
                {...register('minQuantity', {
                  required: {
                    value: true,
                    message: 'minQuantity is required',
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.minQuantity?.type === 'required' && (
                  <span>{errors?.minQuantity?.message}</span>
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
                placeholder="description"
                className="input input-bordered input-primary"
                {...register('description', {
                  required: {
                    value: true,
                    message: 'description is required',
                  },
                  maxLength: {
                    value: 300,
                    message: 'description can not be more than 300 letters',
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.description?.type === 'required' && (
                  <span>{errors?.description?.message}</span>
                )}
                {errors?.description?.type === 'maxLength' && (
                  <span>{errors?.description?.message}</span>
                )}
              </p>
            </div>
            {/* doctors image */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-primary font-bold">Image</span>
              </label>
              <input
                type="file"
                className="input input-bordered input-primary"
                {...register('img', {
                  required: { value: true, message: 'Image is required' },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors?.img?.type === 'required' && (
                  <span>{errors?.img?.message}</span>
                )}
              </p>
            </div>
            {/* submit button */}
            <div className="form-control mt-6">
              {/* {signInError} */}
              <input
                type="submit"
                className="btn btn-primary text-white uppercase"
                value="Add Accessory"
              />{' '}
              {/* <p className="text-center font-bold">
                    New to Doctors Portal?{' '}
                    <span
                      className="text-primary cursor-pointer"
                      onClick={() => navigate('/signup')}
                    >
                      {' '}
                      sign up
                    </span>
                  </p> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCarItem;
