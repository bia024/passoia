// manter comentado - import React, { createContext, useState, useContext, useEffect } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState(() => {
//     try {
//       const localData = localStorage.getItem("shoppingCart");
//       return localData ? JSON.parse(localData) : [];
//     } catch (error) {
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const itemExists = prevItems.find((item) => item.id === product.id);
//       if (itemExists) {
//         return prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prevItems) =>
//       prevItems.filter((item) => item.id !== productId)
//     );
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) {
//       removeFromCart(productId);
//     } else {
//       setCartItems((prevItems) =>
//         prevItems.map((item) =>
//           item.id === productId ? { ...item, quantity: newQuantity } : item
//         )
//       );
//     }
//   };

//   const value = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// }

// export const useCart = () => useContext(CartContext);

import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("shoppingCart");
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const formatPrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace("R$", "").trim().replace(",", "."));
    }
    return price;
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const itemExists = prev.find((i) => i.id === product.id);
      if (itemExists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        formatPrice,
        itemCount: cartItems.reduce((sum, i) => sum + i.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
