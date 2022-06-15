import React from 'react';

const CarItemsRow = ({ carItem, idx, setConfirmDeleteAccessoryModal }) => {
  const { img, itemName, minQuantity, avaialableQuantity, price } = carItem;
  return (
    <tr>
      <th style={{ backgroundColor: 'white' }}>{idx + 1}</th>
      <th style={{ backgroundColor: 'white' }}>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src={img} alt={itemName} />
          </div>
        </div>
      </th>
      <th style={{ backgroundColor: 'white' }}>{itemName}</th>
      {avaialableQuantity < minQuantity ? (
        <>
          <th className="text-red-500" style={{ backgroundColor: 'white' }}>
            Out of stock
          </th>
          <th className="text-red-500" style={{ backgroundColor: 'white' }}>
            Out of stock
          </th>
          <th className="text-red-500" style={{ backgroundColor: 'white' }}>
            Price is unavailable
          </th>
        </>
      ) : (
        <>
          <th style={{ backgroundColor: 'white' }}>{avaialableQuantity}</th>
          <th style={{ backgroundColor: 'white' }}>{minQuantity}</th>
          <th style={{ backgroundColor: 'white' }}>{price}</th>
        </>
      )}
      <th style={{ backgroundColor: 'white' }}>
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
