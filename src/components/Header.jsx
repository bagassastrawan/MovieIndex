import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";

const Header = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [movieData, setMovieData] = useState([]);

    // Auto-slide setiap 5 detik
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % movieData.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [movieData.length]);

    // Fetch data film
    useEffect(() => {
        async function triggerFetchData() {
            const data = await fetchData({ url: "movie/popular?language=en-US&page=1" });
            console.log("Fetched Movie Data:", data);
            if (data.results) {
                setMovieData(data.results.slice(0, 5)); // Ambil 5 film teratas
            }
        }
        triggerFetchData();
    }, []);

    const handlePlay = (movieId) => {
        alert(`Playing movie with ID: ${movieId}`);
    };

    return (
        <div className="relative h-[250px] sm:h-[350px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
            {/* Carousel Images */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {movieData.map((movie, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                        <img
                            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    </div>
                ))}
            </div>

            {/* Film Details */}
            {movieData[currentSlide] && (
                <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-6 md:px-12 text-white">
                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                        {movieData[currentSlide].title}
                    </h1>
                    <p className="text-xs sm:text-sm md:text-lg mt-2 opacity-80">
                        Rating: {movieData[currentSlide].vote_average}/10
                    </p>

                    {/* Stars for rating */}
                    <div className="flex mt-2">
                        {Array.from({ length: 10 }, (_, i) => (
                            <span
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 ${i < Math.round(movieData[currentSlide].vote_average)
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                                    }`}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    {/* Play Button */}
                    <button
                        onClick={() => handlePlay(movieData[currentSlide].id)}
                        className="mt-3 sm:mt-4 px-4 sm:px-6 py-1 sm:py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-lg text-xs sm:text-sm md:text-lg"
                    >
                        ▶ Play
                    </button>
                </div>
            )}

            {/* Indicators */}
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {movieData.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all ${index === currentSlide ? "bg-white scale-125" : "bg-gray-400"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Header;
