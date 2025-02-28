import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchData } from '../utils/fetchData'; // Sesuaikan path jika berbeda

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); // Ambil query dari URL
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            fetchMovies(query);
        }
    }, [query]);

    const fetchMovies = async (searchQuery) => {
        setLoading(true);
        try {
            const data = await fetchData({ url: `search/movie?query=${searchQuery}&language=en-US&page=1` });
            console.log("API Response:", data); // Debugging
            setMovies(data.results || []);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gray-900 text-white">
            <h1 className="text-3xl font-extrabold text-center mb-6">
                🎬 Results for "<span className="text-blue-400">{query}</span>"
            </h1>

            {loading ? (
                <div className="flex justify-center items-center h-60">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <div key={movie.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
                                    <p className="text-sm opacity-75">⭐ {movie.vote_average} / 10</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 col-span-full">No results found. Try another search! 🧐</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
