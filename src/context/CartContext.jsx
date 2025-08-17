import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1, color = "", size = "") => {
    const existing = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.color === color &&
        item.size === size
    );

    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id &&
          item.color === color &&
          item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity, color, size }]);
    }
  };

  const removeFromCart = (id, color = "", size = "") => {
    setCartItems(
      cartItems.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  const updateQuantity = (id, color = "", size = "", quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, color, size);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id && item.color === color && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price.toString().replace(/\s/g, '')) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity, // <-- ajouté
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
