import React, { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCart.jsx";
import Product from "../components/Product.jsx";
import Loading from "../components/Loading.jsx";

const ProductListPage = () => {
  const { loading, listOfProducts } = useContext(ShoppingCartContext);

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-950 sm:text-4xl">
          Our Featured Products
        </h2>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {listOfProducts && listOfProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 mt-10 lg:mt-16 lg:gap-8 lg:grid-cols-3">
              {listOfProducts.map((product) => {
                return <Product key={product.id} product={product} />;
              })}
            </div>
          ) : (
            <h1 className="text-center text-xl text-red-600 sm:text-2xl">
              Failed to fetch data
            </h1>
          )}
        </>
      )}
    </section>
  );
};

export default ProductListPage;
