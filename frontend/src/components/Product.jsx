import React from 'react';

export function Product({ product, addToCart }) {
    const { name, image, price, stock } = product;

    return (
        <div className="productCard">
            <img src={image} alt="Image of product" className="productImg"/>
            <h2>{name}</h2>
            <p className="productPrice">${price}</p>
            <p>Stock: {stock}</p>
            <button 
                onClick={addToCart} 
                disabled={stock === 0}
            >
                {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
        </div>
    );
}
