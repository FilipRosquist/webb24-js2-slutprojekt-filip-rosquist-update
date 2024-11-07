import React from 'react';

export function PurchaseConfirm({ cart, totalPrice, setpageView, emptyCart }) {

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/update-stock", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      if (!res.ok) {
        throw new Error('Failed to update stock');
      }

      // Tömmer kundvagnen ser tar dig tillbaka till produktsidan när du genomfört ett köp
      emptyCart();
      setpageView("products");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="purchaseConfirmation">
      <h1>Thank you for your purchase!</h1>
      <p>Receipt:</p>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} className="cartItemImg" />
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>

      <button onClick={handleCheckout}>
        Return to Product page
      </button>
    </div>
  );
}
