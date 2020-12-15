import React from 'react';
import { CartContext } from '../contexts/UseContext';
import products from '../products';
import groupBy from 'lodash/groupBy';

export default function Cart() {
  const {
    removeItem,
    addItem,
    cart,
    cartGroupByItems,
    totalPrice,
    countItemsInEach,
  } = React.useContext(CartContext);
  return (
    <div className="cart">
      {cartGroupByItems.map((product) => (
        <div className="cart-item">
          <img src={product.image_url} alt={product.name} width="100" />
          <div className="content">
            <h3>{product.name}</h3>
            <div className="cart-buttons">
              <button onClick={() => removeItem(product.sku)}>-</button>
              <button>{countItemsInEach(product.sku)}</button>
              <button onClick={() => addItem(product.sku)}>+</button>
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        {cart.length > 0 ? cart.reduce((acc, v) => acc + v.price, 0) : 0}
      </div>
    </div>
  );
}
