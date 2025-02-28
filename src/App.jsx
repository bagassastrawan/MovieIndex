import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Anime from "./components/anime";
import MovieDetails from "./components/MovieDetails";
import Header from "./components/Header";
import SearchPage from "./page/searchPage";

function App() {
  const location = useLocation();

  return (
    <div className="pt-16"> {/* Tambahkan padding agar konten tidak tertutup navbar */}
      <Navbar />
      {location.pathname === "/" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}


export default App;
