"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
const CartContext =
  createContext<any>(null);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [cartItems, setCartItems] =
    useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
useEffect(() => {

  const savedCart =
    localStorage.getItem(
      "cart"
    );

  if (savedCart) {

    setCartItems(
      JSON.parse(savedCart)
    );

  }

  setIsLoaded(true);

}, []);
useEffect(() => {

  if (!isLoaded) return;

  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems)
  );

}, [cartItems, isLoaded]);

  function addToCart(
    product: any
  ) {

    setCartItems((prev) => [

      ...prev,

      {
        ...product,
        quantity: 1,
      },

    ]);

  }

  function removeFromCart(
    index: number
  ) {

    setCartItems((prev) =>
      prev.filter(
        (_, i) =>
          i !== index
      )
    );

  }

  function clearCart() {

    setCartItems([]);

  }

  const cartTotal =
    cartItems.reduce(
      (
        total,
        item
      ) => {

        const price =
          Number(
            item.salePrice ||
              item.price
          );

        return (
          total +
          price *
            item.quantity
        );

      },
      0
    );
    const cartCount = cartItems.reduce(
  (total: number, item: any) =>
    total + (item.quantity || 1),
  0
);

  return (

    <CartContext.Provider
      value={{

        cartItems,

        setCartItems,

        addToCart,

        removeFromCart,

        clearCart,

        cartTotal,

        cartCount,


      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export function useCart() {
  return useContext(
    CartContext
  );

}