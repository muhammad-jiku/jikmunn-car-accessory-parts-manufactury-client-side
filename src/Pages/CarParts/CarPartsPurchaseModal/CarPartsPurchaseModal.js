import React from 'react';
import { useForm } from 'react-hook-form';

function CarPartsPurchaseModal({ carItemPurchase }) {
  const { _id, itemName, minQuantity, avaialableQuantity, price } =
    carItemPurchase;
  const {
    register,
    formState: { errors },
    handleSubmit,
    // watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    //    await signInWithEmailAndPassword(data?.email, data?.password);
  };
  // console.log(carItemPurchase);
  return (
    <div>
      <input type="checkbox" id="purchase-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="purchase-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mb-4">
              {/* <label className="label">
                <span className="label-text text-primary font-bold">Name</span>
              </label> */}
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
                    value: 30,
                    message: 'Name can not be more than 30 letters',
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
              {/* <label className="label">
                <span className="label-text text-primary font-bold">Email</span>
              </label> */}
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
              {/* <label className="label">
                <span className="label-text text-primary font-bold">
                  Name
                </span>
              </label> */}
              <input
                type="text"
                placeholder="Address"
                className="input input-bordered input-primary"
                {...register('address', {
                  required: {
                    value: true,
                    message: 'Address is required',
                  },
                  maxLength: {
                    value: 30,
                    message: 'Address can not be more than 30 letters',
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.address?.type === 'required' && (
                  <span>{errors?.address?.message}</span>
                )}
                {errors.address?.type === 'maxLength' && (
                  <span>{errors?.address?.message}</span>
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
                value={itemName}
                className="input input-bordered input-primary"
                // {...register('itemName', {
                //   required: {
                //     value: true,
                //     message: 'Item is required',
                //   },
                // })}
                readOnly
                disabled
              />
              <p className="text-red-500 font-semibold">
                {/* {errors?.itemName?.type === 'required' && (
                  <span>{errors?.itemName?.message}</span>
                )} */}
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
                type="number"
                placeholder="Quantity"
                className="input input-bordered input-primary"
                {...register('quantity', {
                  required: {
                    value: true,
                    message: 'Quantity is required',
                  },
                  min: {
                    value: minQuantity,
                    message: `You can not order below ${minQuantity} pcs`,
                  },
                  max: {
                    value: avaialableQuantity,
                    message: `You can not order above ${avaialableQuantity} pcs`,
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.quantity?.type === 'required' && (
                  <span>{errors?.quantity?.message}</span>
                )}
                {errors.quantity?.type === 'min' && (
                  <span>{errors?.quantity?.message}</span>
                )}
                {errors.quantity?.type === 'max' && (
                  <span>{errors?.quantity?.message}</span>
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
                type="number"
                placeholder="Price"
                className="input input-bordered input-primary"
                {...register('totalPrice', {
                  required: {
                    value: true,
                    message: 'Price is required',
                  },
                })}
              />
              <p className="text-red-500 font-semibold">
                {errors.totalPrice?.type === 'required' && (
                  <span>{errors?.totalPrice?.message}</span>
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
                value="Purchase"
                disabled={errors?.quantity}
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
}

export default CarPartsPurchaseModal;
