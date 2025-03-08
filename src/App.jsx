import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import Movie from "./components/Movie";
import MovieDetails from "./components/MovieDetails";
import Header from "./components/Header";
import SearchPage from "./page/searchPage";
import MovieList from "./page/MovieList";

function App() {
  const location = useLocation();

  return (
    <div>
      <Navbar />
      {location.pathname === "/" && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movie" element={<Movie />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/MovieList" element={<MovieList />} />
      </Routes>
    </div>
  );
}

export default App;
