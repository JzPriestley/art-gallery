import React from "react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import styles from "./GalleryGrid.module.css";
import { Link } from "react-router-dom";

export default function GalleryGrid({ artworks }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = artworks.map((art) => ({
    src: art.src,
    alt: art.title,
  }));

  const handleOpen = (i) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <div className={styles.grid}>
        {artworks.map((art, i) => (
          <div className={styles.card} key={art.id}>
            <img
              src={art.src}
              alt={art.title}
              loading="lazy"
              className={styles.image}
              onClick={() => handleOpen(i)}
            />

            <div className={styles.info}>
              <h3>{art.title}</h3>
              <p>{art.category} — {art.medium}</p>
              <Link to={`/product/${art.id}`} className={styles.btn}>
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </>
  );
}
