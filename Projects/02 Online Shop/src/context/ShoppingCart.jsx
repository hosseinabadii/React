import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListOfProducts } from "../services/api";

const ShoppingCartContext = createContext(null);

const ShoppingCartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const fetchListOfProducts = async () => {
    try {
      const result = await getListOfProducts();
      if (result && result?.products) {
        setListOfProducts(result.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListOfProducts();
  }, []);

  const handleAddToCart = (productDetails) => {
    const copyCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = copyCartItems.findIndex(
      (item) => item.id === productDetails.id
    );

    if (findIndexOfCurrentCartItem === -1) {
      copyCartItems.push({
        ...productDetails,
        quantity: 1,
        totalPrice: productDetails.price,
      });
      navigate("/cart");
    } else {
      const currentCartItem = copyCartItems[findIndexOfCurrentCartItem];
      copyCartItems[findIndexOfCurrentCartItem] = {
        ...currentCartItem,
        quantity: currentCartItem.quantity + 1,
        totalPrice: (currentCartItem.quantity + 1) * currentCartItem.price,
      };
    }

    setCartItems(copyCartItems);
    localStorage.setItem("cartItems", JSON.stringify(copyCartItems));
  };

  const handleRemoveFromCart = (
    singleCartItem,
    isFullyRemoveFromCart = true
  ) => {
    const copyCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = copyCartItems.findIndex(
      (item) => item.id === singleCartItem.id
    );

    if (isFullyRemoveFromCart) {
      copyCartItems.splice(findIndexOfCurrentCartItem, 1);
    } else {
      copyCartItems[findIndexOfCurrentCartItem] = {
        ...singleCartItem,
        quantity: singleCartItem.quantity - 1,
        totalPrice: (singleCartItem.quantity - 1) * singleCartItem.price,
      };
    }

    setCartItems(copyCartItems);
    localStorage.setItem("cartItems", JSON.stringify(copyCartItems));
  };

  const value = {
    loading,
    setLoading,
    listOfProducts,
    handleAddToCart,
    cartItems,
    handleRemoveFromCart,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export { ShoppingCartContext, ShoppingCartProvider };
