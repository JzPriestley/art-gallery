import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Gallery from "./pages/Gallery/Gallery";
import Contact from "./pages/Contact/Contact";
import Product from "./pages/Product/Product";
import Search from "./pages/Search/Search";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./pages/Cart/Cart";



function App() {
  return (
    <Router>
      <Header />

      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />  
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
