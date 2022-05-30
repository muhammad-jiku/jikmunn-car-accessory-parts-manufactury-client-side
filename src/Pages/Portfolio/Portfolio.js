import React from 'react';
import { useQuery } from 'react-query';
import Spinner from '../Shared/Spinner/Spinner';
import proPic from '../../Images/me.jpg';

const Portfolio = () => {
  const { data: profile, isLoading } = useQuery('profile', () =>
    fetch('https://jikmunn-carmania.herokuapp.com/portfolio').then((res) =>
      res.json()
    )
  );

  if (isLoading) return <Spinner />;
  return (
    <div className="container mx-auto my-6">
      <div className="flex flex-col items-center lg:flex-row">
        <div className="avatar px-6">
          <div className="w-64 rounded-full">
            <img className="mask mask-circle" src={proPic} alt="" />
          </div>
        </div>
        <div className="px-6 text-justify">
          <p className="text-xl">
            Hi! My name is{' '}
            <span className="text-orange-500">Muhammad Azizul Hoque Jiku</span>.
            Welcome to Car mania manufacturer site that I've designed and
            developed.
          </p>
          <p>
            I've been study MECHANICAL ENGINEERING in SHAHJALAL UNIVERSITY OF
            TECHNOLOGY,SYLHET. I've been developing and designing website since
            2020 and I have learn some web-developmental programming languages
            since then. I've been learn some skill of web-development langauges
            and some framework such as:
          </p>
          <ul>
            <li>HTML/CSS</li>
            <li>JAVASCRIPT</li>
            <li>REACT.JS</li>
            <li>NODE.JS</li>
            <li>BOOTSTRAP/TAILWIND/MATERIAL UI</li>
            <li>MONGODB DATABASE</li>
          </ul>{' '}
          <p className="text-xl">
            My email address is{' '}
            <span className="text-orange-500">muhammadjiku364@gmail.com</span>{' '}
            and my contact number is{' '}
            <span className="text-orange-500">+8801855613783</span>.
          </p>
        </div>
      </div>
      <div className="my-6">
        <h1 className="text-center text-red-900 text-3xl my-6 uppercase">
          Some of my projects that i've designed and developed
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {profile?.map((pro) => (
            <div
              className="card card-compact bg-base-100 shadow-xl"
              key={pro?._id}
            >
              <a href={pro?.siteLink}>
                <figure>
                  <img src={pro?.img} alt={pro?.projectName} />
                </figure>
                <h2 className="text-uppercase text-center text-xl my-4">
                  {pro?.projectName}
                </h2>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
