import React from "react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Auth.module.css";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Read redirect query parameter (e.g. ?redirect=/product/12)
  const [params] = useSearchParams();
  const redirectTo = params.get("redirect") || "/";

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // 🔥 REDIRECT to the original page (product, or whatever)
    navigate(redirectTo);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Welcome Back</h2>
        <p className={styles.subtitle}>Login to continue</p>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleLogin} className={styles.form}>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className={styles.primaryBtn}>Login</button>
        </form>

        <p className={styles.forgot}>
          <button
            type="button"
            onClick={async () => {
              const emailInput = prompt("Enter your email:");
              if (!emailInput) return;

              const { error } = await supabase.auth.resetPasswordForEmail(emailInput);

              if (error) alert(error.message);
              else alert("Password reset email sent!");
            }}
          >
            Forgot Password?
          </button>
        </p>

        <p className={styles.switchText}>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
