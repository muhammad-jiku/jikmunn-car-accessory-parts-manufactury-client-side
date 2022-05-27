import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';

function MyOrders() {
  const [user] = useAuthState(auth);
  const [myOrders, setMyOrders] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/order?user=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMyOrders(data);
      })
      .catch((err) => console.log(err));
  }, [user]);
  return (
    <div>
      MyOrders
      {console.log(myOrders)}
    </div>
  );
}

export default MyOrders;
