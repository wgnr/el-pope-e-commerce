import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
const LOCAL_STORAGE_CART = 'cart';

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getLocalStorage() || []);

  function setLocalStorage(items) {
    localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(items));
  }

  function getLocalStorage() {
    try {
      const currCart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART));
      return Array.isArray(currCart) ? currCart : []
    } catch (e) {
      return []
    }
  }

  function addToCart(item) { // newImtem={id, quantity}
    const indexItemCart = items.findIndex(cartItem => cartItem.id === item.id)

    if (indexItemCart === -1) {
      const newArr = [...items, item];
      setLocalStorage(newArr);
      return setItems(newArr)
    }

    const newArr = [...items];
    newArr[indexItemCart].quantity =
      newArr[indexItemCart].quantity + item.quantity;

    setLocalStorage(newArr);
    setItems(newArr)
  }

  function removeFromCart(itemId) {
    const newCart = items.filter(cartItem => cartItem.id !== itemId)
    localStorage.setItem(LOCAL_STORAGE_CART, newCart);
    setItems(newCart)
  }

  function getTotalItems() {
    return items.reduce((acc, cur) => acc + cur.quantity, 0)
  }

  function clearCart() {
    setItems([]);
  }

  return <CartContext.Provider value={{
    addToCart,
    items,
    totalItems: getTotalItems(),
    removeFromCart,
    clearCart,
  }}>
    {children}
  </CartContext.Provider>
}