import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { supabase } from "../../lib/supabase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  function validatePassword(pw) {
    return (
      pw.length >= 8 &&
      /[A-Z]/.test(pw) &&
      /[0-9]/.test(pw) &&
      /[^A-Za-z0-9]/.test(pw)
    );
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (!validatePassword(password)) {
      setError("Weak password: Must be 8+ chars, uppercase, number, symbol");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    navigate("/login");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Create Account</h2>
        <p className={styles.subtitle}>Join our art community</p>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSignup} className={styles.form}>

          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (8+ chars, uppercase, number, symbol)"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValid(validatePassword(e.target.value));
            }}
            required
          />

          <button 
            className={styles.primaryBtn}
            disabled={!valid}
            style={{ opacity: valid ? 1 : 0.5 }}
          >
            Sign Up
          </button>
        </form>

        <p className={styles.switchText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
