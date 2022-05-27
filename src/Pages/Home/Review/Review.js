import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../Shared/Spinner/Spinner';

function Review() {
  const { data: reviews, isLoading } = useQuery('reviews', () =>
    fetch('http://localhost:5000/reviews').then((res) => res.json())
  );

  if (isLoading) return <Spinner />;

  return (
    <div>
      {console.log(reviews)}
      Review
    </div>
  );
}

export default Review;
