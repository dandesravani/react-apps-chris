import React from 'react';
import { CartContext } from '../contexts/UseContext';

export const Product = ({ product }) => {
  const { addItem, removeItem, countItemsInEach } = React.useContext(
    CartContext
  );

  return (
    <div className="product">
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <div className="product-buttons">
        {countItemsInEach(product.sku) > 0 ? (
          <button className="remove" onClick={() => removeItem(product.sku)}>
            Remove
          </button>
        ) : (
          <div />
        )}

        <button className="add" onClick={() => addItem(product.sku)}>
          Add to cart({countItemsInEach(product.sku)})
        </button>
      </div>
    </div>
  );
};
