import React from "react";

const Modal = ({ handleConfirm, handleCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-sm w-1/2">
        <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
        <p>Are you sure you want to delete this blog?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleConfirm}
            className="text-red-600 bg-white p-2 cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="text-blue-600 bg-white p-2 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
