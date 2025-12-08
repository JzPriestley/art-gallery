import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

export default function Signup() {
  const [error, setError] = useState("");

  // Vite environment variable
  const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

  function handleSignup(e) {
    e.preventDefault();

    if (DEMO_MODE) {
      setError("Signup is disabled in demo mode. Please use the demo account:");
      return;
    }

    // Otherwise, normal signup logic here
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Create Account</h2>
        <p className={styles.subtitle}>Join our art community</p>

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <p><b>Email:</b> demo@artshop.com</p>
            <p><b>Password:</b> demo1234</p>
          </div>
        )}

        {/* FORM FIELDS DISABLED IN DEMO MODE */}
        <form onSubmit={handleSignup} className={styles.form}>
          <input type="text" placeholder="Full name" disabled />
          <input type="email" placeholder="Email address" disabled />
          <input type="password" placeholder="Password" disabled />

          <button className={styles.primaryBtn} style={{ opacity: 0.6 }}>
            Sign Up (Disabled)
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
