import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import styles from "./Header.module.css";
import { AuthContext } from "../../Context/AuthContext";
import { FavoritesContext } from "../../Context/FavoritesContext";
import { CartContext } from "../../Context/CartContext";
import DemoBanner from "../DemoBanner/DemoBanner";


export default function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const { user, logout } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);
  const { cart } = useContext(CartContext);


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <>
    <DemoBanner />
    <header className={styles.header} style={{ marginTop: "32px" }}>

      {/* LOGO */}
      <div className={styles.logo}>
        <Link to="/">
          <img src="/images/Logo.jpg" alt="Logo" />
        </Link>
      </div>

      {/* SEARCH BAR */}
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search artworks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* NAV MENU */}
      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : "")}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : "")}>
          About
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => (isActive ? styles.active : "")}>
          Gallery
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? styles.active : "")}>
          Contact
        </NavLink>
      </nav>

      {/* RIGHT ICONS */}
      <div className={styles.icons}>

        {/* Wishlist with Badge */}
          <div className={styles.iconBadgeWrapper} onClick={() => navigate("/favorites")}>
            <FaHeart className={styles.iconBtn} />
            {favorites.length > 0 && (
              <span className={styles.badge}>{favorites.length}</span>
            )}
          </div>

          {/* Cart with Badge */}
          <div className={styles.iconBadgeWrapper} onClick={() => navigate("/cart")}>
            <FaShoppingCart className={styles.iconBtn} />
            {cart.length > 0 && (
              <span className={styles.badge}>{cart.length}</span>
            )}
          </div>


        {/* AUTH SECTION */}
        <div className={styles.authButtons}>
         
          {!user ? (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")} className={styles.signupBtn}>
                Sign Up
              </button>
            </>
          ) : (
            <>
              <div className={styles.iconBtn} onClick={() => navigate("/profile")}>
                <FaUser />
              </div>
              {user && (
                <span className={styles.username}>
                  Hi, {user.user_metadata?.full_name || "User"}
                </span>
              )}
              <button onClick={() => { logout(); navigate("/"); }}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
    </>
  );
}
