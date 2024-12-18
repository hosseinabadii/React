import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../context/ShoppingCart";

const Product = ({ product }) => {
  const { handleAddToCart, cartItems } = useContext(ShoppingCartContext);

  return (
    <div className="bg-white relative group p-6 cursor-pointer">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Link to={`/product-details/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-center object-cover transition-all duration-300 group-hover:scale-125"
        />
        </Link>
      </div>
      <div className="flex items-start justify-between mt-4 space-x-4">
        <div className="font-bold text-gray-900 text-xs sm:text-sm md:text-base">
          <Link to={`/product-details/${product.id}`}>
          <p className="w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
            {product.title}
          </p>
          </Link>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900 text-xs sm:text-sm">
            ${product.price}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleAddToCart(product)}
          disabled={cartItems.some((item) => item.id === product?.id)}
          className="mt-5 px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold rounded disabled:opacity-65 disabled:cursor-not-allowed"
        >
          {cartItems.some((item) => item.id === product?.id)
            ? "Item already in cart"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default Product;
