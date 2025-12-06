import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className={styles.aboutPage}>
      <section className={styles.headerSection}>
        <h1>About the Artist</h1>
        <p className={styles.subtitle}>
          A journey through creativity, color, and emotion.
        </p>
      </section>

      <div className={styles.container}>

        {/* LEFT — Artist Photo */}
        <div className={styles.imageWrapper}>
          <img src="/images/artist.jpg" alt="Artist" />
        </div>

        {/* RIGHT — Bio */}
        <div className={styles.textWrapper}>
          <h2>Hello, I'm Jezebel Priestley</h2>

          <p>
            I’m an artist based in Germany, creating expressive
            artworks inspired by nature, emotions, and the depth of human
            experience. For the past several years, I’ve experimented with oils,
            acrylics, digital mediums, and mixed-media techniques to explore
            movement, light, and abstract forms.
          </p>

          <p>
            My work focuses on capturing moods through color and gesture —
            blending structure with spontaneity. Each piece is an attempt to
            translate feelings into visual language, creating art that resonates
            with calm, energy, or reflection.
          </p>

          <h3>Artistic Specialties</h3>
          <ul className={styles.skills}>
            <li>• Landscape Painting</li>
            <li>• Portraits & Figurative Art</li>
            <li>• Abstract & Expressionist Works</li>
            <li>• Mixed Media & Digital Art</li>
          </ul>

          <Link to="/contact" className={styles.contactBtn}>
            Contact the Artist
          </Link>
        </div>
      </div>
    </div>
  );
}
