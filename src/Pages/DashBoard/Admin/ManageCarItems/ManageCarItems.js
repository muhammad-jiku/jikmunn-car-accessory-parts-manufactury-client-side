import React, { useEffect, useState } from 'react';

function ManageCarItems() {
  const [carItems, setCarItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/car-parts')
      .then((res) => res.json())
      .then((data) => setCarItems(data))
      .catch((err) => console.log(err));
  });
  return (
    <div>
      ManageCarItems
      {console.log(carItems)}
    </div>
  );
}

export default ManageCarItems;
