import React from 'react';
import { useNavigate } from 'react-router-dom';

const PopulerMovie = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white p-5">
            <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
            <div className="overflow-x-auto scrollbar-hide p-2">
                <div className="flex space-x-5">
                    {Array.isArray(data) && data.map((movie, index) => (
                        <div
                            key={index}
                            className="w-40 h-64 sm:w-32 sm:h-52 flex-shrink-0 border border-white rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-48 sm:h-36 object-cover"
                            />
                            <p className="text-center font-bold text-sm p-2">{movie.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PopulerMovie;
