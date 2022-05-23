import React from 'react';

function Description() {
  return (
    <div>
      <div>
        <h1 className="text-center">About carmania</h1>
        <p>
          Welcome to carmania, your number one source for all things car parts.
          We're dedicated to providing you the best of car parts, with a focus
          on dependability. customer service, and manufacturing.
        </p>
      </div>
      <div>
        <h1>Our CERTIFIED PARTNERS</h1>
        <ul className="flex m-4 justify-around">
          <li>BMW</li>
          <li>FERRARI</li>
          <li>HONDA</li>
          <li>AUDI</li>
          <li>JEEP</li>
          <li>TOYOTA</li>
          <li>FORD</li>
          <li>VOLVO</li>
        </ul>
      </div>
    </div>
  );
}

export default Description;
