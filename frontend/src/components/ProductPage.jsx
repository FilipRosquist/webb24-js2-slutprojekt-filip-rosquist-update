import React from 'react';
import { Product } from './Product';

export function ProductPage({ products, setCart, setProducts, cart }) {

  const addToCart = (product) => {
    // Minskar saldo för vald produkt
    const updatedProducts = products.map(p => 
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p
    );
    setProducts(updatedProducts);

    // Kollar om produkten redan finns i kundvagnen 
    const existingProductInCart = cart.find(p => p.id === product.id);
    if (existingProductInCart) {
      setCart(cart.map(p => 
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="productPage">
      <div className="productList">
        {products.length > 0 ? (
          products.map(product => (
            <Product
              key={product.id}
              product={product}
              addToCart={() => addToCart(product)}
            />
          ))
        ) : (
          <p className="noProduct">No products found.</p>
        )}
      </div>
    </div>
  );
}
