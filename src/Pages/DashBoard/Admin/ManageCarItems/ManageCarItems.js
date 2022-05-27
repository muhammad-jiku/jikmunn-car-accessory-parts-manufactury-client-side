import React, { useEffect, useState } from 'react';
import CarItemsRow from './CarItemsRow';

function ManageCarItems() {
  const [carItems, setCarItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/car-parts')
      .then((res) => res.json())
      .then((data) => setCarItems(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      ManageCarItems
      {console.log(carItems)}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Item</th>
              <th>Quantity (available)</th>
              <th>Quantity (minimum to order)</th>
              <th>Price (per item)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {carItems
              ?.slice(0)
              ?.reverse()
              ?.map((carItem, idx) => (
                <CarItemsRow
                  key={carItem?._id}
                  carItem={carItem}
                  idx={idx}
                  // setConfirmDelteModal={setConfirmDelteModal}
                />
              ))}
          </tbody>
        </table>
      </div>{' '}
    </div>
  );
}

export default ManageCarItems;
