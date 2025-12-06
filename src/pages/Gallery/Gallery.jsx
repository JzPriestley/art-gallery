// src/pages/Gallery/Gallery.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Masonry from "react-masonry-css";
import styles from "./Gallery.module.css";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [index, setIndex] = useState(-1);
  const [categories, setCategories] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMedium, setSelectedMedium] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");

  // Fetch artworks from Supabase
  useEffect(() => {
    async function fetchArtworks() {
      const { data, error } = await supabase.from("artworks").select("*");
      if (!error && data) {
        setImages(data);
        setFilteredImages(data);

        const cats = ["All", ...new Set(data.map((i) => i.category))];
        const meds = ["All", ...new Set(data.map((i) => i.medium))];
        setCategories(cats);
        setMediums(meds);
      }
    }

    fetchArtworks();
  }, []);

  // Apply filter and sort
  useEffect(() => {
    let temp = [...images];

    if (selectedCategory !== "All") temp = temp.filter(i => i.category === selectedCategory);
    if (selectedMedium !== "All") temp = temp.filter(i => i.medium === selectedMedium);

    if (sortOption === "Newest") temp.sort((a, b) => b.id - a.id);
    if (sortOption === "Price Low→High") temp.sort((a, b) => a.price - b.price);
    if (sortOption === "Price High→Low") temp.sort((a, b) => b.price - a.price);

    setFilteredImages(temp);
  }, [selectedCategory, selectedMedium, sortOption, images]);

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    768: 2,
    480: 1,
  };

  return (
    <div className={styles.galleryPage}>
      <h1>Gallery</h1>

      {/* FILTERS */}
      <div className={styles.filterContainer}>
        <div>
          <strong>Category:</strong>
          {categories.map(cat => (
            <button
              key={cat}
              className={styles.filter}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          <strong>Medium:</strong>
          {mediums.map(med => (
            <button
              key={med}
              className={styles.filter}
              onClick={() => setSelectedMedium(med)}
            >
              {med}
            </button>
          ))}
        </div>

        <div>
          <strong>Sort:</strong>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.filter}
          >
            <option>Newest</option>
            <option>Price Low→High</option>
            <option>Price High→Low</option>
          </select>
        </div>
      </div>

      {/* MASONRY GRID */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={styles.masonryGrid}
        columnClassName={styles.masonryCol}
      >
        {filteredImages.map((img, i) => (
          <div className={styles.card} key={img.id}>
            <img
              src={img.image}
              alt={img.title}
              onClick={() => setIndex(i)}
              onContextMenu={(e) => e.preventDefault()}
              className={styles.image}
            />
            <p>{img.title}</p>
            <p>${img.price}</p>
          </div>
        ))}
      </Masonry>

      {/* LIGHTBOX */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={filteredImages.map((img) => ({ src: img.image }))}
        index={index}
      />
    </div>
  );
}
