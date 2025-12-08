import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Auth.module.css";
import { supabase } from "../../lib/supabase";
// import msgStyles from "./AuthMessageBox.module.css";

export default function Login() {
  const [email, setEmail] = useState("demo@artshop.com");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");

  const [params] = useSearchParams();
  const redirectTo = params.get("redirect") || "/";
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid demo credentials.");
      return;
    }

    navigate(redirectTo);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Welcome Back</h2>
        <p className={styles.subtitle}>Demo login enabled</p>

        {/* DEMO LOGIN INFO */}
        <div className={styles.infoBox}>
          <p><b>Demo Account:</b></p>
          
        </div>

        {/* <div className={msgStyles.box}>
          <p><b>Demo Account:</b></p>
          <p>Email: demo@artshop.com</p>
          <p>Password: demo1234</p>
        </div> */}


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
          <span style={{ opacity: 0.5 }}>Forgot Password? (disabled)</span>
        </p>

        <p className={styles.switchText}>
          Need an account? <span style={{ opacity: 0.5 }}>Signup disabled</span>
        </p>
      </div>
    </div>
  );
}
