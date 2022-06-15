import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../../Shared/Spinner/Spinner';
import DeleteCarAccessory from '../DeleteCarAccessory/DeleteCarAccessory';
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
                  <th
                    style={{ backgroundColor: '#F3EEEE', color: 'black' }}
                  ></th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Image
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Item
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Quantity (available)
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Quantity (minimum to order)
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Price (per item)
                  </th>
                  <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
                    Actions
                  </th>
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
            <DeleteCarAccessory
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
