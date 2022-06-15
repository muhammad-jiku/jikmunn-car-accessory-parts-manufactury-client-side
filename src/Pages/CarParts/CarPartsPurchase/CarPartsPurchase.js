import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';
import CarPartsPurchaseModal from '../CarPartsPurchaseModal/CarPartsPurchaseModal';

const CarPartsPurchase = () => {
  const { carItemId } = useParams();
  const [carItem, setCarItem] = useState({});
  const [carItemPurchase, setCarItemPurchase] = useState(null);

  useEffect(() => {
    fetch(`https://jikmunn-carmania.herokuapp.com/car-parts/${carItemId}`)
      .then((res) => res.json())
      .then((data) => setCarItem(data))
      .catch((err) => console.log(err));
  }, [carItemId, carItem]);

  return (
    <div className="p-10">
      {!carItem ? (
        <Spinner />
      ) : (
        <>
          <div className="flex flex-col lg:flex-row items-center p-10">
            <div className="flex-1">
              <img src={carItem?.img} alt={carItem?.itemName} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl mb-4">{carItem?.itemName}</h1>
              {carItem?.avaialableQuantity < carItem?.minQuantity ? (
                <h1 className="text-xl text-red-500 mb-4">Stock is full now</h1>
              ) : (
                <>
                  <h1 className="text-xl mb-4">
                    <span className="text-orange-500">
                      {carItem?.avaialableQuantity}{' '}
                    </span>
                    pcs are available now
                  </h1>
                  <h1 className="text-xl mb-4">
                    <span className="text-orange-500">
                      {carItem?.minQuantity}{' '}
                    </span>
                    pcs can order now
                  </h1>
                  <h1 className="text-xl mb-4">
                    <span className="text-orange-500"> ${carItem?.price} </span>
                    (per unit price){' '}
                  </h1>
                </>
              )}

              <h1 className="text-xl mb-4">{carItem?.description}</h1>
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
        </>
      )}
      {carItemPurchase && (
        <CarPartsPurchaseModal
          carItemPurchase={carItemPurchase}
          setCarItemPurchase={setCarItemPurchase}
        />
      )}
    </div>
  );
};

export default CarPartsPurchase;
