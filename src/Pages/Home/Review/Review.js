import {
  faQuoteLeft,
  faQuoteRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../Shared/Spinner/Spinner';

function Review() {
  const { data: reviews, isLoading } = useQuery('reviews', () =>
    fetch('http://localhost:5000/reviews').then((res) => res.json())
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="container mx-auto my-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {reviews?.map((review) => (
        <div
          className="card bg-base-100 border-2 border-purple-700"
          key={review?._id}
        >
          {/* <SwiperSlide> */}
          <div className="card-body font-bold">
            <div className="card-actions justify-start">
              <div className="avatar">
                <div className="w-12 lg:w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={review?.img} alt={review?.displayName} />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start font-semibold px-2">
                <h1 className="text-lg">{review?.displayName}</h1>
                <h1 className="text-xl flex items-center">
                  {review?.rating}{' '}
                  <span>
                    <FontAwesomeIcon
                      icon={faStar}
                      // className="text-primary"
                      style={{ color: 'yellow' }}
                      size="xl"
                    />
                  </span>
                </h1>
              </div>
            </div>
            <FontAwesomeIcon
              icon={faQuoteLeft}
              className="text-primary"
              size="xl"
            />
            <p>{review?.review}</p>
            <FontAwesomeIcon
              icon={faQuoteRight}
              className="text-primary"
              size="xl"
            />
          </div>
          {/* </SwiperSlide> */}
        </div>
      ))}
    </div>
  );
}

export default Review;
