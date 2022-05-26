import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';

function CarParts() {
  const navigate = useNavigate();

  const { data: carParts, isLoading } = useQuery('carParts', () =>
    fetch('http://localhost:5000/car-parts').then((res) => res.json())
  );

  if (isLoading) return <Spinner />;

  // const [carParts, setCarParts] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:5000/car-parts')
  //     .then((res) => res.json())
  //     .then((data) => setCarParts(data))
  //     .catch((err) => console.log(err));
  // });
  return (
    <div className="container mx-auto my-12">
      {/* {console.log(carParts)} */}
      <h1 className="text-center text-3xl text-success my-6">
        Brand Building Car Parts
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {carParts?.map((carPart) => (
          <div className="card bg-base-100 shadow-xl" key={carPart?._id}>
            <figure className="h-60">
              <img
                src={carPart?.img}
                alt={carPart?.itemName}
                // className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{carPart?.itemName}</h2>
              <p>${carPart?.price}</p>
              <p>At least {carPart?.minQuantity} pcs can order</p>
              <p>{carPart?.avaialableQuantity} pcs are available now</p>
              <p>{carPart?.description?.slice(0, 120)}</p>
              <div className="card-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/purchase/${carPart?._id}`)}
                >
                  place order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarParts;
