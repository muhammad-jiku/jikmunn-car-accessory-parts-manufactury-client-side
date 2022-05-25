import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-primary">404</h1>
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
}

export default NotFound;
