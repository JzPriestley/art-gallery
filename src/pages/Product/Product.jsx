import React, { useContext, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./Product.module.css";
import { supabase } from "../../lib/supabase";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { FavoritesContext } from "../../Context/FavoritesContext";
import { CartContext } from "../../Context/CartContext";
import { AuthContext } from "../../Context/AuthContext";

export default function Product() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Load artwork
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setArtwork(data);
    }
    load();
  }, [id]);

  if (!artwork) {
    return (
      <div className={styles.notFound}>
        <h2>Artwork Not Found</h2>
        <Link to="/gallery" className={styles.backBtn}>Back to Gallery</Link>
      </div>
    );
  }

  // Favorite checker
  const isFavorite = favorites.some((fav) => fav.artwork_id === Number(id));

  // Protected favorite
  const toggleFavorite = () => {
    if (!user) {
      navigate("/login?redirect=/product/" + id);
      return;
    }

    if (isFavorite) removeFavorite(Number(id));
    else addFavorite(Number(id));
  };

  // Protected add to cart
  const handleAddToCart = () => {
    if (!user) {
      navigate("/login?redirect=/product/" + id);
      return;
    }

    addToCart(Number(id));
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>

        {/* LEFT IMAGE */}
        <div className={styles.imageWrapper}>
          <img
            src={artwork.image}
            alt={artwork.title}
            onClick={() => setLightboxOpen(true)}
            className={styles.mainImage}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.info}>
          <h1>{artwork.title}</h1>

          {artwork.category && <p><strong>Category:</strong> {artwork.category}</p>}
          {artwork.medium && <p><strong>Medium:</strong> {artwork.medium}</p>}

          <p className={styles.description}>{artwork.description}</p>

          <div className={styles.actions}>

            {/* BUY */}
            <button
              className={styles.buyBtn}
              onClick={() =>
                (window.location.href =
                  `mailto:your-email@example.com?subject=Artwork Inquiry: ${artwork.title}`)
              }
            >
              Buy / Contact
            </button>

            {/* FAVORITE */}
            <button className={styles.favoriteBtn} onClick={toggleFavorite}>
              {isFavorite ? "❤️ Added to Favorites" : "🤍 Add to Favorites"}
            </button>

            {/* CART */}
            <button className={styles.favoriteBtn} onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
          </div>

          <Link to="/gallery" className={styles.backLink}>← Back to Gallery</Link>
        </div>
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={[{ src: artwork.image }]}
      />
    </div>
  );
}
