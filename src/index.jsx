import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import { FavoritesProvider } from "./Context/FavoritesContext";
import { CartProvider } from "./Context/CartContext";
// import { ProtectedRoute } from "./components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <FavoritesProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </FavoritesProvider>
    </AuthProvider>
  </React.StrictMode>
);
