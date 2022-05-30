import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51L1xjlI8Pcw7BJpaYSjSszfpHUgQMwhYrr8jEgZtEadNtp4t2dOGzhHbls5x5XQQXMdFAlH5wQsfITnipSWrkAlM00KAvqRZXd'
);

const Payment = () => {
  const { id } = useParams();
  const url = `https://jikmunn-carmania.herokuapp.com/order/${id}`;

  const { data: order, isLoading } = useQuery(['myOrders', id], () =>
    fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    }).then((res) => res.json())
  );

  const { orderName, userName, price, quantity, address } = order;

  if (isLoading) return <Spinner />;

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col">
        <div className="card w-full max-w-sm bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{orderName}</h2>
            <p>
              Dear{' '}
              <span className="text-primary font-bold uppercase">
                {userName}
              </span>{' '}
              , Your orders for {quantity} pcs of {orderName} are ready to be
              shipped at {address}
            </p>
            <p>
              Please pay only $
              <span className="text-orange-500 font-semibold">{price}</span> to
              receive your order from{' '}
              <span className="text-primary font-semibold">CARMANIA</span>
            </p>
          </div>
        </div>
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <Elements stripe={stripePromise}>
              <CheckoutForm order={order} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
