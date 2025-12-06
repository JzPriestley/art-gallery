import React from "react";
import {useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Trigger email
    const mailtoLink = `mailto:your-email@example.com?subject=Art Inquiry from ${form.name}&body=${encodeURIComponent(form.message + "\n\nEmail: " + form.email)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className={styles.contactPage}>
      <h1>Contact</h1>
      <p className={styles.subtitle}>Feel free to reach out for commissions, collaborations, or inquiries.</p>

      <div className={styles.container}>

        {/* LEFT — FORM */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </label>

          <label>
            Message
            <textarea
              rows="6"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            ></textarea>
            {errors.message && <span className={styles.error}>{errors.message}</span>}
          </label>

          <button type="submit" className={styles.submitBtn}>Send Message</button>
        </form>

        {/* RIGHT — DETAILS */}
        <div className={styles.infoSide}>
          <h3>Studio & Location</h3>
          <p>Frankfurt, Germany</p>

          <h3>Email</h3>
          <p>clayandcanvascreations.com</p>

          <h3>Follow</h3>
          <ul className={styles.socialList}>
            <li><a href="https://www.youtube.com/redirect?event=channel_header&redir_token=QUFFLUhqbWs5elFqbmt3dGNwdVRCcHdQWlVoREphRWROQXxBQ3Jtc0tuUEswTUt5Z3QxNjdBdVdNTXRHcmNRUU5GLW9xMWxFUFpnT1BBRkU5SnhZM3czUEhSLW1JWTBoenM1akx0UTg1Sk9RQWRZZHlrTDFBbDlxcGRpbDIwVGhwaXdwemJNUkZlUGJxcmxFTXNZcWg3YzBycw&q=https%3A%2F%2Fwww.instagram.com%2Fclayandcanvas_creations%3Figsh%3DMW10amN4djhndmNmcw%3D%3D" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://youtube.com/@clayandcanvascreations?si=ABsLVyzqCEjmZqDP" target="_blank" rel="noopener">Youtube</a></li>
          </ul>
        </div>

      </div>
    </div>
  );
}
