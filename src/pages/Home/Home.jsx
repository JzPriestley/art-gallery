import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import styles from "./Home.module.css";

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch latest 3 featured artworks
      const { data: fData, error: fError } = await supabase
        .from("artworks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (!fError) setFeatured(fData);

      // Fetch unique categories
      const { data: cData, error: cError } = await supabase
        .from("artworks")
        .select("category");

      if (!cError) {
        const uniqueCats = ["All", ...new Set(cData.map((r) => r.category))];
        setCategories(uniqueCats);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.home}>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Discover Original Art</h1>
          <p>Explore unique artwork crafted with passion and creativity.</p>
          <Link to="/gallery" className={styles.heroBtn}>
            Explore Gallery
          </Link>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className={styles.featuredSection}>
        <h2>Featured Art</h2>
        <div className={styles.categoryGrid}>
          {featured.length === 0 ? (
            <p>Loading...</p>
          ) : (
            featured.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className={styles.categoryCard}
              >
                <img src={item.image} alt={item.title} />
                <div className={styles.catOverlay}>{item.title}</div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className={styles.categorySection}>
        <h2>Shop by Category</h2>
        <div className={styles.categoryGrid}>
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/gallery?category=${cat}`}
              className={styles.categoryCard}
            >
              <img
                src={`/images/cat-${cat.toLowerCase()}.jpg`}
                alt={cat}
              />
              <div className={styles.catOverlay}>{cat}</div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
