import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../../firebase.init';
import Spinner from '../../Shared/Spinner/Spinner';
import UpdateProfileModal from './UpdateProfileModal';

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const [updateProfile, setUpdateProfile] = useState(null);

  const {
    data: userProfile,
    isLoading,
    refetch,
  } = useQuery(['userProfile', user], () =>
    fetch(`https://jikmunn-carmania.herokuapp.com/user/${user?.email}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        // authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    }).then(
      (res) => res.json()
      // {
      // console.log('res ', res);
      // if (res.status === 401 || res.status === 403) {
      //   signOut(auth);
      //   localStorage?.removeItem('accessToken');
      // }
      // return res.json();
      // }
    )
  );

  if (isLoading) return <Spinner />;
  return (
    <div className="container mx-auto px-4 lg:px-64 card  ">
      <div className="card-body">
        <div className="w-64 rounded-full">
          <img
            className="mask mask-circle object-center my-6"
            src={user?.photoURL || 'https://i.ibb.co/mF39255/icon-256x256.png'}
            alt={user?.displayName}
          />
        </div>
        <div>
          <h1 className="text-2xl mb-4">Name: {user?.displayName}</h1>
          <h1 className="text-xl mb-4">Email: {userProfile?.email}</h1>
          {userProfile?.role && <h1 className="text-xl mb-4">Admin</h1>}

          <h1 className="text-xl mb-4">
            Institution: {userProfile?.education || 'education'}
          </h1>
          <h1 className="text-xl mb-4">
            Phone: {userProfile?.phone || 'phone'}
          </h1>
          <h1 className="text-xl mb-4">
            Address: {userProfile?.location || 'location'}
          </h1>
          {userProfile?.linkedIn ? (
            <>
              LinkedIn:{' '}
              <a href={userProfile?.linkedIn} className="text-lg text-black">
                {userProfile?.linkedIn}
              </a>
            </>
          ) : (
            <h1 className="text-xl mb-4">LinkedIn: linkedIn</h1>
          )}
        </div>
        <label
          htmlFor="update-modal"
          onClick={() => {
            setUpdateProfile(userProfile);
          }}
          className="btn btn-primary my-6 modal-button"
        >
          update Profile
        </label>
      </div>
      {updateProfile && (
        <UpdateProfileModal
          updateProfile={updateProfile}
          setUpdateProfile={setUpdateProfile}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MyProfile;
