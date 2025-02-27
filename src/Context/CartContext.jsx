import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const getInitialCartItems = () => {
    try {
      const storedItems = localStorage.getItem("cartItems");
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Failed to parse cart items from localStorage:", error);
      return [];
    }
  };
  const [cartItems, setCartItems] = useState(getInitialCartItems);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log(cartItems);
  }, [cartItems]);

  const addToCart = (item) => {
    // Check if item is already in cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += Number(item.quantity);
      setCartItems(updatedItems);
    } else {
      // Add new item
      setCartItems([
        ...cartItems,
        { ...item, id: item.id || Date.now().toString() },
      ]);
    }
  };

  const plusItemQuantity = (item) => {
    console.log(item);
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    }
  };

  const removeCartItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const minusItemQuantity = (item) => {
    console.log(item);
    if (item.quantity < 1) {
      removeCartItem(item.id);
    }
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity -= 1;
      setCartItems(updatedItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const getTotalPrice = () => {
    const price = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return parseFloat(price.toFixed(2));
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeCartItem,
    clearCart,
    getTotalPrice,
    getItemCount,
    plusItemQuantity,
    minusItemQuantity,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
