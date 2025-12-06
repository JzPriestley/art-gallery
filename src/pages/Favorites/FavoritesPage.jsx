import React, { useContext } from "react";
import { FavoritesContext } from "../../Context/FavoritesContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your Favorites List is Empty ❤️</h2>
        <p>Browse artworks and add some to your favorites.</p>
        <Link to="/gallery" className={styles.backBtn}>Back to Gallery</Link>
      </div>
    );
  }

  return (
    <div className={styles.favoritesPage}>
      <h1>Your Favorite Artworks</h1>

      <div className={styles.masonry}>
        {favorites.map((fav) => (
          <div key={fav.id} className={styles.card}>

            <img
              src={fav.artworks.image}
              alt={fav.artworks.title}
              className={styles.image}
              onClick={() => navigate(`/product/${fav.artwork_id}`)}
            />

            <div className={styles.cardInfo}>
              <h3>{fav.artworks.title}</h3>

              <button
                className={styles.removeBtn}
                onClick={() => removeFavorite(fav.artwork_id)}
              >
                ❌ Remove
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
