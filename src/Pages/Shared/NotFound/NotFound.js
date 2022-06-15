import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImg from '../../../Images/NotFound.gif';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <img src={NotFoundImg} alt="not found" />
          <h1 className="text-3xl font-bold py-4">Page is not found!</h1>
          <button
            className="btn btn-primary text-white uppercase font-bold bg-gradient-to-r from-secondary to-primary cursor-pointer"
            onClick={() => navigate('/')}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
