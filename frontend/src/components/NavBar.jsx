import React from 'react';

export function NavBar({ setpageView, cart }) {
  // Räkna ut antalet i kundvagnen
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navBar">
      <button onClick={() => setpageView('products')}>
        Products
      </button>
      <button onClick={() => setpageView('cart')}>
        Shopping Cart {cartCount > 0 ? `(${cartCount})` : ""}
      </button>
    </nav>
  );
}
