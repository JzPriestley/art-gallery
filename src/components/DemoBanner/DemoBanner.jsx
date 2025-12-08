import React from "react";
import styles from "./DemoBanner.module.css";

export default function DemoBanner() {
  // Vite environment variables are accessed via import.meta.env
  const isDemo = import.meta.env.VITE_DEMO_MODE === "true";

  // Do not render banner if demo mode is off
  if (!isDemo) return null;

  return (
    <div className={styles.banner}>
      DEMO MODE — Signup disabled. Use demo@artshop.com / demo1234
    </div>
  );
}
