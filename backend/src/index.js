import express from 'express';
import cors from 'cors';
import { fetchProducts, updateProducts } from './handledb.js';
import { searchProducts } from './search.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Hämtar produkter
app.get('/api/products', async (req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sök och sortering
app.get('/api/search', async (req, res) => {
  const { query, sort } = req.query;

  try {
    const products = await searchProducts(query, sort);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Uppdaterar saldot efter checkout
app.post('/api/update-stock', async (req, res) => {
  const cart = req.body.cart;

  try {
    let products = await fetchProducts();

    // Uppdaterar saldo beroende på hur mycket som ligger i kundvagnen
    cart.forEach(cartItem => {
      const product = products.find(p => p.id === cartItem.id);
      if (product) {
        product.stock = Math.max(0, product.stock - cartItem.quantity);
      }
    });

    // Sparar nya saldot
    await updateProducts(products);

    res.json({ message: 'Stock updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Startar serven
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
