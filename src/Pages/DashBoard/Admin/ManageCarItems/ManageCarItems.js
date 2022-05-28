import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from '../../../Shared/Spinner/Spinner';
import ConfirmDeleteCarAccessoryModal from '../ConfirmDeleteCarAccessoryModal/ConfirmDeleteCarAccessoryModal';
import CarItemsRow from './CarItemsRow';

function ManageCarItems() {
  // const [carItems, setCarItems] = useState([]);
  const [confirmDeleteAccessoryModal, setConfirmDeleteAccessoryModal] =
    useState(null);

  // useEffect(() => {
  //   fetch('https://jikmunn-carmania.herokuapp.com/car-parts')
  //     .then((res) => res.json())
  //     .then((data) => setCarItems(data))
  //     .catch((err) => console.log(err));
  // }, []);

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
    </div>
  );
}

export default ManageCarItems;
