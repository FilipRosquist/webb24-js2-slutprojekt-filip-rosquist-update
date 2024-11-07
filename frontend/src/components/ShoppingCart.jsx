import React from 'react';

export function ShoppingCart({ cart, products, setCart, setProducts, setpageView }) {

  // Tar bort produkten från kundvagnen och uppdaterar saldot
  const removeFromCart = (productId) => {
    const productToRemove = cart.find(p => p.id === productId);

    if (productToRemove) {
      const updatedProducts = products.map(p => 
        p.id === productId ? { ...p, stock: p.stock + 1 } : p
      );
      setProducts(updatedProducts);

      if (productToRemove.quantity > 1) {
        setCart(cart.map(p => 
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        ));
      } else {
        setCart(cart.filter(p => p.id !== productId));
      }
    }
  };

  // Tömmer hela kundvagnen
  const emptyCart = () => {
    const updatedProducts = products.map(p => {
      const cartItem = cart.find(item => item.id === p.id);
      if (cartItem) {
        return { ...p, stock: p.stock + cartItem.quantity };
      }
      return p;
    });
    setProducts(updatedProducts);
    setCart([]);
  };

  // Tar dig till checkout
  const checkout = () => {
    if (cart.length > 0) {
      setpageView("checkout");
    }
  };

  // Räknar ut det totala priset
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="shoppingCart">
      <h2>Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id} className="cartItem">
                <img src={item.image} alt={item.name} className="cartItemImg" />
                <div>
                  {item.name} - ${item.price} x {item.quantity}
                </div>
                <button 
                  className="removeButton" 
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <button className="checkoutButton" onClick={checkout}>Checkout</button>
          <button className="emptyCartButton" onClick={emptyCart}>Empty Cart</button>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}
