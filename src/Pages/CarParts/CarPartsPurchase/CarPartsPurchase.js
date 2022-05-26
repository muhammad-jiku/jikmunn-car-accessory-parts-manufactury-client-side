import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarPartsPurchaseModal from '../CarPartsPurchaseModal/CarPartsPurchaseModal';

function CarPartsPurchase() {
  const { carItemId } = useParams();
  const [carItem, setCarItem] = useState({});
  const [carItemPurchase, setCarItemPurchase] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/car-parts/${carItemId}`)
      .then((res) => res.json())
      .then((data) => setCarItem(data))
      .catch((err) => console.log(err));
  }, [carItemId, carItem]);

  return (
    <div className="p-10 bg-base-300">
      {/* {console.log(carItem)} */}

      <div className="flex flex-col lg:flex-row items-center bg-base-100 p-10">
        <div className="flex-1">
          <img src={carItem?.img} alt={carItem?.itemName} />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl">{carItem?.itemName}</h1>
          {carItem?.avaialableQuantity < carItem?.minQuantity ? (
            <h1 className="text-xl text-red-500">Stock is full now</h1>
          ) : (
            <>
              <h1 className="text-xl">
                {carItem?.avaialableQuantity}
                pcs are available now
              </h1>
              <h1 className="text-xl">
                {carItem?.minQuantity}
                pcs can order now
              </h1>
              <h1 className="text-xl">${carItem?.price} (per unit price) </h1>
            </>
          )}

          <h1 className="text-xl">{carItem?.description}</h1>
          {/* <button
            disabled={carItem?.avaialableQuantity < carItem?.minQuantity}
            onClick={() => setCarItemPurchase(carItem)}
            className="btn btn-primary my-6"
          >
            Place Order
          </button> */}
          <label
            htmlFor="purchase-modal"
            disabled={carItem?.avaialableQuantity < carItem?.minQuantity}
            onClick={() => setCarItemPurchase(carItem)}
            className="btn btn-primary my-6 modal-button"
          >
            Place Order
          </label>
        </div>
      </div>
      {carItemPurchase && (
        <CarPartsPurchaseModal
          carItemPurchase={carItemPurchase}
          setCarItemPurchase={setCarItemPurchase}
        />
      )}
    </div>
  );
}

export default CarPartsPurchase;
