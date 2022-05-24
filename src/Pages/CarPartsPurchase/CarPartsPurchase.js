import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CarPartsPurchase() {
  const { carItemId } = useParams();

  const [carItem, setCarItem] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/car-parts/${carItemId}`)
      .then((res) => res.json())
      .then((data) => setCarItem(data))
      .catch((err) => console.log(err));
  }, [carItemId]);
  return (
    <div className="container mx-auto p-10">
      {console.log(carItem)}
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="flex-1">
          <img src={carItem?.img} alt={carItem?.itemName} />
        </div>
        <div className="flex-1">
          <h1 className="text-xl">{carItem?.itemName}</h1>
          <h1 className="text-xl">
            {carItem?.avaialableQuantity} pcs are available now
          </h1>
          <h1 className="text-xl">{carItem?.minQuantity} pcs</h1>
          <h1 className="text-xl">${carItem?.price} (per unit price) </h1>
          <h1 className="text-xl">{carItem?.description}</h1>
        </div>
      </div>
    </div>
  );
}

export default CarPartsPurchase;
