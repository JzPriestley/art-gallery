import React,{ createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { AuthContext } from "./AuthContext";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  // Load favorites when user logs in
  useEffect(() => {
    if (user) fetchFavorites();
    else setFavorites([]);
  }, [user]);

  // async function fetchFavorites() {
  //   const { data, error } = await supabase
  //     .from("favorites")
  //     .select("*")
  //     .eq("user_id", user.id);

  //   if (!error) setFavorites(data);
  // }

      async function fetchFavorites() {
      if (!user) return;

      const { data, error } = await supabase
        .from("favorites")
        .select("id, artwork_id, artworks (*)") // JOIN artworks table
        .eq("user_id", user.id);

      if (!error) {
        setFavorites(data || []);
      }
    }


  async function addFavorite(artwork_id) {
    if (!user) return;

    const { data, error } = await supabase
      .from("favorites")
      .insert([{ user_id: user.id, artwork_id }]);

    if (!error) fetchFavorites();
  }

  async function removeFavorite(artwork_id) {
    if (!user) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("artwork_id", artwork_id);

    if (!error) fetchFavorites();
  }

  function isFavorite(artwork_id) {
    return favorites.some((f) => f.artwork_id === artwork_id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
