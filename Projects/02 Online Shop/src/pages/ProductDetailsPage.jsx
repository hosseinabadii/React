import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../context/ShoppingCart.jsx";
import Loading from "../components/Loading.jsx";
import { getProductDetails } from "../services/api.js";

const ProductDetailsPage = () => {
  const [productDetails, setProductDetails] = useState(null);
  const { id } = useParams();
  const { loading, setLoading, handleAddToCart, cartItems } =
    useContext(ShoppingCartContext);

  const fetchProductDetails = async () => {
    try {
      const result = await getProductDetails(id);
      if (result) setProductDetails(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProductDetails(null);
    setLoading(true);
    fetchProductDetails();
  }, [id]);

  if (loading) return <Loading />;
  return (
    <div className="p-6 max-w-4xl lg:max-w-7xl mx-auto bg-white">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 shadow-ms p-6 items-center">
        <div className="md:col-span-3 w-full md:sticky top-0 text-center">
          <div className="px-4 py-10 rounded-xl shadow-lg relative">
            <img
              className="w-4/5 rounded object-cover"
              src={productDetails?.thumbnail}
              alt={productDetails?.title}
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {productDetails?.images?.length &&
              productDetails?.images?.map((image, index) => (
                <div key={index} className="w-1/4 rounded-xl p-4 shadow-md">
                  <img
                    className="rounded object-cover"
                    src={image}
                    alt="Product Secondary Image"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-2xl font-extrabold text=[#333333]">
            {productDetails?.title}
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            <p className="text-xl font-bold">${productDetails?.price}</p>
          </div>
          <div>
            <button
              onClick={() => handleAddToCart(productDetails)}
              disabled={cartItems.some(
                (item) => item.id === productDetails?.id
              )}
              className="mt-5 min-w-[200px] px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold rounded disabled:opacity-65 disabled:cursor-not-allowed"
            >
              {cartItems.some((item) => item.id === productDetails?.id)
                ? "Item already in cart"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
