import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user on mount
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user) {
        setUser(data.session.user); // <- Supabase user object
      }
    });

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
