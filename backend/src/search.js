import { fetchProducts } from './handledb.js';

export async function searchProducts(searchQuery = "", sortOption = "az") {
  try {
    const products = await fetchProducts();

    // Filter products by search query
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort products based on sort option
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOption === 'az') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'price-asc') {
        return a.price - b.price;
      } else if (sortOption === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

    return sortedProducts;
  } catch (error) {
    console.error("Error searching products:", error);
    throw new Error('Failed to search products');
  }
};
