import { createContext, useState, useContext } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [itemsInCart, setItemsInCart] = useState([]);

  const addToCart = (item) => {
    setItemsInCart([...itemsInCart, item]);
  };

  const removeFromCart = (itemId) => {
    setItemsInCart(itemsInCart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ itemsInCart, setItemsInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
