const getListOfProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const result = await response.json();
  return result;
};

const getProductDetails = async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const result = await response.json();
  return result;
};

export { getListOfProducts, getProductDetails };
