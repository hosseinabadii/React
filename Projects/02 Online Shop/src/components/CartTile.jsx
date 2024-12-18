import React, { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCart";

const CartTile = ({ singleCartItem }) => {
  const { handleRemoveFromCart, handleAddToCart } =
    useContext(ShoppingCartContext);

  return (
    <>
      <div className="grid grid-cols-3 items-start gap-5 bg-white p-4 rounded-md">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img
              src={singleCartItem?.thumbnail}
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 mb-2">
              {singleCartItem?.title}
            </h3>
            <button
              onClick={() => handleRemoveFromCart(singleCartItem)}
              className="text-sm px-4 py-3 bg-black text-white font-bold rounded-md"
            >
              REMOVE
            </button>
          </div>
        </div>

        <div className="ml-auto flex flex-col items-start">
          <h3 className="text-lg font-bold text-gray-900 text-right">
            ${singleCartItem?.totalPrice.toFixed(2)}
          </h3>
          <div className="mt-3 flex gap-1 justify-center">
            <button
              onClick={() => handleRemoveFromCart(singleCartItem, false)}
              disabled={singleCartItem.quantity === 1}
              className="border border-gray-500 rounded-md w-8 h-8 bg-gray-200 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              -
            </button>
            <p className="w-4 h-8 text-lg text-center">{singleCartItem?.quantity}</p>
            <button
              onClick={() => handleAddToCart(singleCartItem)}
              className="border border-gray-500 rounded-md w-8 h-8 bg-gray-200 text-lg"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-500" />
    </>
  );
};

export default CartTile;
