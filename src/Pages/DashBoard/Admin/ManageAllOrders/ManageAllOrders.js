import React, { useEffect, useState } from 'react';

function ManageAllOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/orders')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      ManageAllOrders
      {console.log(orders)}
    </div>
  );
}

export default ManageAllOrders;
