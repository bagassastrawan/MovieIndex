import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        fetch("https://api.example.com/movies")
            .then((res) => res.json())
            .then((data) => setMovies(data.results))
            .catch((err) => console.error(err));
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"}`}>
            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
                {/* Menu & Home Link */}
                <div className="flex items-center space-x-4">
                    <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <NavLink to="/" className={({ isActive }) => `text-lg font-semibold ${isActive ? "text-blue-400" : "text-white"}`}>
                        Home
                    </NavLink>
                    <NavLink to="/MovieList" className={({ isActive }) => `text-lg font-semibold ${isActive ? "text-blue-400" : "text-white"}`}>
                        Movie List
                    </NavLink>
                </div>

                {/* Mobile Menu */}
                <div className={`absolute top-16 left-0 w-full bg-gray-900 p-4 flex flex-col space-y-4 md:hidden transition-all duration-300 ${menuOpen ? "block" : "hidden"}`}>
                    {movies.slice(0, 10).map((movie) => (
                        <NavLink key={movie.id} to={`/movie/${movie.id}`} className={({ isActive }) => `block ${isActive ? "text-blue-400" : "text-white"}`} onClick={() => setMenuOpen(false)}>
                            {movie.title}
                        </NavLink>
                    ))}
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {movies.slice(0, 10).map((movie) => (
                        <NavLink key={movie.id} to={`/movie/${movie.id}`} className={({ isActive }) => `${isActive ? "text-blue-400" : "text-white"}`}>
                            {movie.title}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
