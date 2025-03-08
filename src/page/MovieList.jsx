import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const observer = useRef();
    const navigate = useNavigate();

    const fetchMovies = async () => {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDc2MTAxNzRmMTAwMTZmOTU0OTAxOGQ1ZGIxN2VkNyIsIm5iZiI6MTczMTE1ODkyMS44NTUsInN1YiI6IjY3MmY2Mzg5MTFiNmNjMDU3MWY2MjE2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pKTKl-piPEy8G_nC1Ogx8kho1OG1pvawYFYjScldMLM'
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setMovies(prevMovies => [...prevMovies, ...data.results]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [page]);

    const lastMovieRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

    return (
        <div className="bg-black text-white p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie, index) => {
                    if (index === movies.length - 1) {
                        return (
                            <div ref={lastMovieRef} key={movie.id} className="cursor-pointer border border-white rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300" onClick={() => navigate(`/movie/${movie.id}`)}>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover" />
                                <p className="text-center font-bold p-2">{movie.title}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div key={movie.id} className="cursor-pointer border border-white rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300" onClick={() => navigate(`/movie/${movie.id}`)}>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-64 object-cover" />
                                <p className="text-center font-bold p-2">{movie.title}</p>
                            </div>
                        );
                    }
                })}
            </div>
            {loading && <p className="text-center text-gray-400 mt-4">Loading...</p>}
        </div>
    );
};

export default MovieList;