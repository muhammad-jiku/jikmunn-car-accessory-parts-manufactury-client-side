import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from 'react-query';
import Spinner from '../../Shared/Spinner/Spinner';
const icons = require('@fortawesome/free-solid-svg-icons');

const Services = () => {
  const { data: services, isLoading } = useQuery('services', () =>
    fetch('https://jikmunn-carmania.herokuapp.com/services').then((res) =>
      res.json()
    )
  );

  if (isLoading) return <Spinner />;
  return (
    <div className="container mx-auto my-6">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {services?.map((service) => (
            <div key={service?._id}>
              <div className="text-center">
                <FontAwesomeIcon
                  icon={icons[service?.icon]}
                  className="text-orange-400"
                  size="3x"
                />
                <h1 className="text-primary text-lg font-semibold">
                  {service?.title}
                </h1>
                <h1 className="text-sm">{service?.desc}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
