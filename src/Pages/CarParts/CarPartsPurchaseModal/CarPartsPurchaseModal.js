import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast } from 'react-toastify';

function CarPartsPurchaseModal({ carItemPurchase, setCarItemPurchase }) {
  const [user] = useAuthState(auth);

  const {
    _id,
    // img,
    price,
    itemName,
    minQuantity,
    // description,
    avaialableQuantity,
  } = carItemPurchase;
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
    const address = watch('address').toUpperCase();
    const phone = watch('phone');
    const itemName = watch('itemName');
    const quantity = parseInt(watch('quantity'));
    const remainingQuantity = parseInt(avaialableQuantity) - quantity;
    const price = parseInt(watch('price'));
    const totalPrice = quantity * price;
    console.log({
      displayName,
      email,
      address,
      phone,
      itemName,
      quantity,
      price,
    });

    const order = {
      orderId: _id,
      orderName: itemName,
      user: email,
      userName: displayName,
      address: address,
      quantity: quantity,
      price: totalPrice,
    };

    const updatedCarPartDetails = {
      // _id,
      // img,
      // price,
      // itemName,
      // minQuantity,
      // description,
      avaialableQuantity: remainingQuantity,
    };
    fetch('http://localhost:5000/order', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`You purchased ${itemName} successfully!`);
        console.log(data);
        fetch(`http://localhost:5000/car-parts/${_id}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(updatedCarPartDetails),
        })
          .then((res) => res.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        // to close the modal
        setCarItemPurchase(null);
      });
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
          <h1 className="text-2xl text-secondary text-center p-4">
            Order for {itemName}
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
                // defaultValue={itemName}
                value={itemName}
                className="input input-bordered input-primary"
                {...register('itemName', {
                  //   required: {
                  //     value: true,
                  //     message: 'Item is required',
                  //   },
                })}
                readOnly
                required
                // disabled
              />
              {/* <p className="text-red-500 font-semibold">
                {errors?.itemName?.type === 'required' && (
                  <span>{errors?.itemName?.message}</span>
                )}
                {errors?.displayName?.type === 'maxLength' && (
                  <span>{errors?.displayName?.message}</span>
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
                // placeholder="Price"
                value={
                  getValues('quantity')
                    ? parseInt(price) * parseInt(getValues('quantity'))
                    : parseInt(price)
                }
                className="input input-bordered input-primary"
                {...register('price', {
                  required: {
                    value: true,
                    message: 'Price is required',
                  },
                })}
                readOnly
                required
                // disabled
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
