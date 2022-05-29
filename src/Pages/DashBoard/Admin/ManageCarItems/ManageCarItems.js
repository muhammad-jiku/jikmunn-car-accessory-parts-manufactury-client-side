import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../../Shared/Spinner/Spinner';
import ConfirmDeleteCarAccessoryModal from '../ConfirmDeleteCarAccessoryModal/ConfirmDeleteCarAccessoryModal';
import CarItemsRow from './CarItemsRow';

const ManageCarItems = () => {
  const [confirmDeleteAccessoryModal, setConfirmDeleteAccessoryModal] =
    useState(null);

  const {
    data: carItems,
    isLoading,
    refetch,
  } = useQuery('carItems', () =>
    fetch('https://jikmunn-carmania.herokuapp.com/car-parts', {
      method: 'GET',
    }).then((res) => res.json())
  );

  if (isLoading) return <Spinner />;
  return (
    <div>
      {carItems?.length === 0 ? (
        <h1 className="text-center text-3xl text-red-500 my-6">
          No car accessory part is added
        </h1>
      ) : (
        <>
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
                {carItems
                  ?.slice(0)
                  ?.reverse()
                  ?.map((carItem, idx) => (
                    <CarItemsRow
                      key={carItem?._id}
                      carItem={carItem}
                      idx={idx}
                      setConfirmDeleteAccessoryModal={
                        setConfirmDeleteAccessoryModal
                      }
                    />
                  ))}
              </tbody>
            </table>
          </div>{' '}
          {confirmDeleteAccessoryModal && (
            <ConfirmDeleteCarAccessoryModal
              refetch={refetch}
              confirmDeleteAccessoryModal={confirmDeleteAccessoryModal}
              setConfirmDeleteAccessoryModal={setConfirmDeleteAccessoryModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ManageCarItems;
