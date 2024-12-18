import React, { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCart.jsx";
import { useNavigate } from "react-router-dom";
import CartTile from "../components/CartTile.jsx";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(ShoppingCartContext);

  return (
    <div className="max-w-5xl mx-auto max-md:max-w-xl py-4 px-4">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        My Cart Page
      </h1>
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="md:col-span-2 space-y-4">
          {cartItems && cartItems.length ? (
            cartItems.map((singleCartItem) => (
              <CartTile
                key={singleCartItem.id}
                singleCartItem={singleCartItem}
              />
            ))
          ) : (
            <h1>Cart is empty! Please add some products</h1>
          )}
        </div>

        <div className="px-4 h-max">
          <h3 className="text-xl font-extrabold text-gray-950 border-b border-gray-300 pb-2">
            Order Summary
          </h3>
          <ul className="text-gray-700 mt-4 space-y-4">
            <p className="flex flex-wrap gap-4 text-sm fonct-bold">
              Total Price:<span className="font-bold">${cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}</span>
            </p>
          </ul>
          <div className="mt-5 flex gap-2">
            <button disabled={cartItems.length === 0}
            className="text-sm px-4 py-3 bg-black text-white font-bold rounded-md disabled:opacity-65 disabled:cursor-not-allowed">
              Checkout
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-sm px-4 py-3 bg-black text-white font-bold rounded-md"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
