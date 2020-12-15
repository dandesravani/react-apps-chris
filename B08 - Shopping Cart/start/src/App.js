import React from 'react';
import Header from './components/Header';
import products from './products';
import './App.css';
import { Product } from './components/Product';
import { CartContextProvider } from './contexts/UseContext';

export default function App() {
  return (
    <CartContextProvider>
      <div className="app">
        {/* header */}
        <Header />

        <main>
          <div className="products-list">
            {products.map((it) => (
              <Product key={it.sku} product={it} />
            ))}
          </div>
        </main>
      </div>
    </CartContextProvider>
  );
}
