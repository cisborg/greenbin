import { useMemo } from "react";

const useProcessedProducts = (products) => {
  return useMemo(() => {
    const defaultImage = require("../assets/Bags.png");

    // Step 1: Transform products
    const processedProducts = products.map((product) => ({
      ...product,
      isFlashSale: product.flashSaleStart !== null,
      formattedCreatedAt: new Date(product.createdAt).toLocaleDateString(),
      formattedUpdatedAt: new Date(product.updatedAt).toLocaleDateString(),
      image: product.image.length ? product.image : [defaultImage],
      rating: Math.floor(Math.random() * 5) + 1, // TODO: Replace with actual rating
    }));

    // Step 2: Group products by category
    const groupedProducts = processedProducts.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});

    // Step 3: Optional pagination function
    const paginate = (array, pageSize, pageNumber) =>
      array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

    return {
      processedProducts,
      groupedProducts,
      paginate,
    };
  }, [products]); // Recalculate only when products change
};

export default useProcessedProducts;
