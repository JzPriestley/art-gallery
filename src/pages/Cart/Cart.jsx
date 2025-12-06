import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // TEMPORARY MOCK (replace with real DB when artworks table ready)
  const artworks = {
    1: { title: "Golden Sky", price: 120 },
    2: { title: "Silent Portrait", price: 200 },
    3: { title: "Blue Flow", price: 150 },
  };

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your cart is empty</h2>
        <Link to="/gallery" className={styles.shopBtn}>Browse Artworks</Link>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => {
    const price = artworks[item.artwork_id]?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartPage}>
      <h2>Your Cart</h2>

      <div className={styles.cartList}>
        {cart.map((item) => {
          const art = artworks[item.artwork_id];

          return (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.textBlock}>
                <p><strong>{art?.title}</strong></p>
                <p>Price: ${art?.price}</p>
              </div>

              <div className={styles.qtyBlock}>
                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    updateQuantity(item.artwork_id, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </button>

                <span className={styles.qty}>{item.quantity}</span>

                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    updateQuantity(item.artwork_id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.artwork_id)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.totalSection}>
        <h3>Total: ${total}</h3>
        <button className={styles.checkoutBtn}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
