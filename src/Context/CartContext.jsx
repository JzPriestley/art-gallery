import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user]);

  // Fetch all cart items for current user
  async function fetchCart() {
    if (!user) return;

    const { data, error } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user.id);

    if (!error) {
      setCart(data || []);
    } else {
      console.log("Fetch cart error:", error.message);
    }
  }

  // Add to cart — if item exists → update qty instead of inserting again
  async function addToCart(artwork_id, quantity = 1) {
    if (!user) return;

    // 1. Check if item already exists
    const existing = cart.find((item) => item.artwork_id === artwork_id);

    if (existing) {
      // Update quantity instead of inserting duplicate
      const newQty = existing.quantity + quantity;
      return updateQuantity(artwork_id, newQty);
    }

    // 2. Insert new cart item
    const { error } = await supabase.from("cart").insert([
      {
        user_id: user.id,
        artwork_id,
        quantity,
      },
    ]);

    if (error) {
      console.log("Add to cart error:", error.message);
      return;
    }

    fetchCart();
  }

  // Update quantity
  async function updateQuantity(artwork_id, quantity) {
    if (!user) return;

    const { error } = await supabase
      .from("cart")
      .update({ quantity })
      .eq("user_id", user.id)
      .eq("artwork_id", artwork_id);

    if (error) {
      console.log("Update quantity error:", error.message);
      return;
    }

    fetchCart();
  }

  // Remove item from cart
  async function removeFromCart(artwork_id) {
    if (!user) return;

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id)
      .eq("artwork_id", artwork_id);

    if (error) {
      console.log("Remove cart error:", error.message);
      return;
    }

    fetchCart();
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity, // 👈 make sure this is exported
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
