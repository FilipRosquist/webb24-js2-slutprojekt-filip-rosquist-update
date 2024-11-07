import fs from 'fs/promises';

const productsList = './products.json';

// Hämtar produkterna från min .json fil
export async function fetchProducts() {
  try {
    const data = await fs.readFile(productsList, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products file:', error);
    throw new Error('Failed to load products');
  }
}

// Uppdaterar produktera i min .json fil
export async function updateProducts(products) {
  try {
    await fs.writeFile(productsList, JSON.stringify(products, null, 2));
  } catch (error) {
    console.error('Error writing to products file:', error);
    throw new Error('Failed to save updated stock');
  }
}
