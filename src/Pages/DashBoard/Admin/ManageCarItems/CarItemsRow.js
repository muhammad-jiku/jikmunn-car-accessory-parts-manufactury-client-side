import React from 'react';

const CarItemsRow = ({ carItem, idx, setConfirmDeleteAccessoryModal }) => {
  const { img, itemName, minQuantity, avaialableQuantity, price } = carItem;
  return (
    <tr>
      <th>{idx + 1}</th>
      <th>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={img} alt={itemName} />
          </div>
        </div>
      </th>
      <th>{itemName}</th>
      {avaialableQuantity < minQuantity ? (
        <>
          <th className="text-red-500">Out of stock</th>
          <th className="text-red-500">Out of stock</th>
          <th className="text-red-500">Price is unavailable</th>
        </>
      ) : (
        <>
          <th>{avaialableQuantity}</th>
          <th>{minQuantity}</th>
          <th>{price}</th>
        </>
      )}
      <th>
        <label
          htmlFor="confirm-modal"
          className="btn btn-error text-white font-bold"
          onClick={() => setConfirmDeleteAccessoryModal(carItem)}
        >
          Remove
        </label>
      </th>
    </tr>
  );
};

export default CarItemsRow;
