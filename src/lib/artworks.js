import { supabase } from "./supabase";

export async function fetchArtworks() {
  const { data, error } = await supabase
    .from("artworks")
    .select("*")
    .order("id");

  if (error) {
    console.log("Fetch artworks error:", error.message);
    return [];
  }

  return data;
}
