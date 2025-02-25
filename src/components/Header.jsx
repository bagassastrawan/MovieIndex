import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";

const Header = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [movieData, setMovieData] = useState([]);

    // Mengatur perpindahan otomatis slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % movieData.length);
        }, 5000); // Ganti angka 5000 untuk kecepatan (ms)
        return () => clearInterval(interval);
    }, [movieData.length]);

    // Fetch data film
    useEffect(() => {
        async function triggerFetchData() {
            const data = await fetchData({ url: "movie/popular?language=en-US&page=1" });
            setMovieData(data.results.slice(0, 5)); // Ambil 5 data teratas
        }
        triggerFetchData();
    }, []);

    const handlePlay = (movieId) => {
        // Ganti dengan logika Anda, misalnya redirect ke halaman detail atau pemutar video
        alert(`Playing movie with ID: ${movieId}`);
    };

    return (
        <div className="relative h-[600px] w-full overflow-hidden">
            {/* Carousel Images */}
            <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(-${currentSlide * 100}%)`,
                }}
            >
                {movieData.map((movie, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                        <img
                            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    </div>
                ))}
            </div>

            {/* Film Details */}
            {movieData[currentSlide] && (
                <div className="absolute top-1/4 left-10 text-white z-10">
                    <h1 className="text-4xl font-bold">{movieData[currentSlide].title}</h1>
                    <p className="text-lg mt-2">Rating: {movieData[currentSlide].vote_average}/10</p>

                    {/* Display rating as stars */}
                    <div className="flex items-center mt-2">
                        {Array.from({ length: 10 }, (_, i) => (
                            <span
                                key={i}
                                className={`w-5 h-5 ${i < Math.round(movieData[currentSlide].vote_average)
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                                    }`}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    {/* Play button */}
                    <button
                        onClick={() => handlePlay(movieData[currentSlide].id)}
                        className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                        Play
                    </button>
                </div>
            )}

            {/* Indicators */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {movieData.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${index === currentSlide ? "bg-white" : "bg-gray-400"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Header;
