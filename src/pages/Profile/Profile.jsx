import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { supabase } from "../../lib/supabase";
import styles from "./Profile.module.css";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.user_metadata?.full_name || "");
  const [message, setMessage] = useState("");

  async function updateProfile(e) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
    });

    if (error) setMessage(error.message);
    else setMessage("Profile updated successfully!");
  }

  async function changePassword() {
    const newPassword = prompt("Enter new password (min 8 chars):");
    if (!newPassword) return;

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) alert(error.message);
    else alert("Password updated!");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2>Your Profile</h2>

        <p><strong>Email:</strong> {user?.email}</p>

        {message && <p className={styles.message}>{message}</p>}

        <form onSubmit={updateProfile} className={styles.form}>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className={styles.primaryBtn}>Update Profile</button>
        </form>

        <button className={styles.secondaryBtn} onClick={changePassword}>
          Change Password
        </button>
      </div>
    </div>
  );
}
