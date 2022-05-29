import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../Shared/Spinner/Spinner';

const Description = () => {
  const { data: partners, isLoading } = useQuery('partners', () =>
    fetch('https://jikmunn-carmania.herokuapp.com/partners').then((res) =>
      res.json()
    )
  );

  if (isLoading) return <Spinner />;
  return (
    <div className="container mx-auto my-6 justify-between">
      <h1 className="text-3xl text-center my-4">
        Order your desire manufactury car accessory parts from{' '}
        <span className="text-primary uppercase italic">carmania</span>
      </h1>
      <div className="flex flex-col lg:flex-row">
        <div>
          <h1 className="text-lg text-justify px-6">
            CARMANIA is a Professional manufactury Platform which is trusted by
            over 75,000 companies all over the world. Here we will provide you
            only interesting content, which you will like very much. We're
            dedicated to providing you the best of manufactury, with a focus on
            dependability and stocking bike. We're working to turn our passion
            for manufactury into a booming online website. We hope you enjoy our
            manufactury as much as we enjoy offering them to you.
          </h1>
        </div>
        <div>
          <h1 className="text-lg text-justify px-6">
            Expand your business online with our multi-channel manufactury
            management system. Set up and integrate your business with platform
            like Alibaba, Amazon, Daraz, eBay, Walmart, Etsy, WooCommerce or
            Shopify account, and start selling your merchandise.
          </h1>
        </div>
      </div>
      <div className="container mx-auto">
        <h1 className="text-2xl text-center my-4">
          CONNECT TO ALL THE POPULAR PLATFORMS
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {partners?.map((pic) => (
            // < key={pic?._id} className="brands">
            <img key={pic?._id} src={pic?.img} alt="" />
            // </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
