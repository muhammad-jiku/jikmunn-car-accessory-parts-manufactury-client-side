import React, { useEffect, useState } from 'react';

function MakeAdmin() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      MakeAdmin
      {console.log(users)}
    </div>
  );
}

export default MakeAdmin;
