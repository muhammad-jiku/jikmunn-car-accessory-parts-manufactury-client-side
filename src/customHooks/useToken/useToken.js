const { useState, useEffect } = require('react');

const useToken = (user) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    const email = user?.user?.email;
    const currentUser = { email: email };
    if (email) {
      fetch(`https://jikmunn-carmania.herokuapp.com/user/${email}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => {
          console.log('res ', res);
          return res.json();
        })
        .then((data) => {
          console.log('data inside user token ', data);
          const accessToken = data?.accessToken;
          localStorage?.setItem('accessToken', accessToken);
          setToken(accessToken);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  return [token];
};

export default useToken;
