import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Search() {
  const location = useLocation();
  const [results, setResults] = useState([]);

  // Extract the search query from URL
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (query.trim() !== "") {
      runSearch(query);
    }
  }, [query]);

  const runSearch = (text) => {
    // Example: artworks stored locally (later replace with real data)
    const artworks = [
      { id: 1, title: "Sunset Watercolor", category: "watercolor" },
      { id: 2, title: "Ghibli Forest Train", category: "ghibli" },
      { id: 3, title: "Blue Abstract", category: "abstract" }
    ];

    const filtered = artworks.filter(
      (item) =>
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.category.toLowerCase().includes(text.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Search Results for: "{query}"</h2>

      {results.length === 0 ? (
        <p>No artworks found.</p>
      ) : (
        <ul>
          {results.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
