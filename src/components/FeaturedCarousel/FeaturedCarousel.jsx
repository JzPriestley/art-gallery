import React from "react";
import { useState } from "react";
import styles from "./FeaturedCarousel.module.css";

export default function FeaturedCarousel({ images }) {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.arrowLeft} onClick={handlePrev}>❮</button>

      <img
        src={images[index].src}
        alt={images[index].title}
        className={styles.image}
        loading="lazy"
      />

      <button className={styles.arrowRight} onClick={handleNext}>❯</button>

      <div className={styles.caption}>{images[index].title}</div>
    </div>
  );
}
