import React from 'react';
import Banner from '../Banner/Banner';
import BusinessSummary from '../BusinessSummary/BusinessSummary';
import CarParts from '../CarParts/CarParts';
import Description from '../Description/Description';
import Review from '../Review/Review';
import Services from '../Services/Services';

function Home() {
  return (
    <div>
      <Banner />
      <Description />
      <CarParts />
      <Services />
      <BusinessSummary />
      <Review />
    </div>
  );
}

export default Home;
