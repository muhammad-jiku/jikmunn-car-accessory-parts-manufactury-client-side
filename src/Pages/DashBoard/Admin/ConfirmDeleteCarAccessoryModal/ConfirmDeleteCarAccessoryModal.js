import React from 'react';
import { toast } from 'react-toastify';

function ConfirmDeleteCarAccessoryModal({
  refetch,
  confirmDeleteAccessoryModal,
  setConfirmDeleteAccessoryModal,
}) {
  const { _id, itemName } = confirmDeleteAccessoryModal;

  const handleDelete = (id) => {
    console.log(confirmDeleteAccessoryModal);
    fetch(`https://jikmunn-carmania.herokuapp.com/car-parts/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          toast.success(
            `Dear Admin, ${itemName} is removed from car parts accessory`
          );
          setConfirmDeleteAccessoryModal(null);
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-700">
            Dear Admin, are you sure want to remove {itemName} from car items
            accessory of CARMANIA?
          </h3>
          <div className="modal-action">
            <button
              className="btn btn-error text-white font-bold"
              onClick={() => handleDelete(_id)}
            >
              Yes
            </button>
            <label htmlFor="confirm-modal" className="btn">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteCarAccessoryModal;
