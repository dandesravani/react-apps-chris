import React, { useContext } from 'react';
import { Product } from '../components/Product';
import products from '../products';
import includes from 'lodash/includes';

export const CartContext = React.createContext(undefined);

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        cart: [
          ...state.cart,
          products.find((prod) => prod.sku === action.payload),
        ],
      };
    }
    case 'REMOVE': {
      const indInCart = state.cart.findIndex((p) => p.sku === action.payload);
      return {
        cart: [
          ...state.cart.slice(0, indInCart),
          ...state.cart.slice(indInCart + 1),
        ],
      };
    }
    case 'EMPTY': {
      return {
        cart: [],
      };
    }
    default: {
      return state;
    }
  }
};

const initialState = { cart: [], quantity: 0 };

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const addItem = (sku) => dispatch({ type: 'ADD', payload: sku });

  const removeItem = (name) => dispatch({ type: 'REMOVE', payload: name });

  const countItemsInEach = (sku) => {
    const cartItemInEach = state.cart.filter((prod) => prod.sku === sku);
    return cartItemInEach.length;
  };

  const groupByItems = () => {
    return state.cart.reduce((acc, val) => {
      const indexInCart = acc.findIndex((p) => p.sku === val.sku);
      const isInCart = indexInCart !== -1;
      if (isInCart) {
        acc[indexInCart].quantity = acc[indexInCart].quantity + 1;
        return acc;
      }

      acc.push({ ...products, quantity: 1 });
      return acc;
    }, []);
  };

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        cart: state.cart,
        countItemsInEach,
        cartGroupByItems: groupByItems(),
        quantity: state.cart.length,
        totalPrice: '',
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
