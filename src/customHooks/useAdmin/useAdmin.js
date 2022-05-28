import { useEffect, useState } from 'react';

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(`https://jikmunn-carmania.herokuapp.com/admin/${email}`, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAdmin(data?.admin);
          setAdminLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return [admin, adminLoading];
};

export default useAdmin;
