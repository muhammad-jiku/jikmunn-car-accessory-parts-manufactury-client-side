import React from 'react';
import bannerPic from '../../../Images/banner.png';

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      // style="background-image: url(https://api.lorem.space/image/fashion?w=1000&h=800);"
      style={{ backgroundImage: `url(${bannerPic})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold">
            WELCOME to{' '}
            <span className="text-primary italic uppercase">carmania</span>
          </h1>
          <p className="mb-5 text-xl text-justify">
            This site is your no.1 source for all things car parts. We're
            dedicated to providing you the best of car parts, with a focus on
            dependability. customer service, and manufacturing. You can order
            your choosable car accessory part from here and get it easily within{' '}
            few days
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
