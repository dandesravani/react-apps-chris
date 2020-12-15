import React from 'react';
import useOnClickOutside from 'use-onclickoutside';
import { CartContext } from '../contexts/UseContext';
import CartIcon from '../supermarket.svg';
import Cart from './Cart';

export default function Header() {
  const { cart } = React.useContext(CartContext);
  const ref = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleModalClick = () => {
    setIsOpen(!isOpen);
  };
  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <header>
      <div className="container">
        <div className="cart-button">
          <button onClick={handleModalClick}>
            <img src={CartIcon} width="30" />({cart.length})
          </button>

          <div
            className="cart-modal"
            ref={ref}
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
}
