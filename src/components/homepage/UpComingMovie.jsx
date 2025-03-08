import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpComingMovie = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white p-5">
            <h1 className="text-3xl font-bold mb-4">Upcoming Movies</h1>
            <div className="overflow-x-auto scrollbar-hide p-2">
                <div className="flex space-x-5">
                    {Array.isArray(data) && data.map((movie, index) => (
                        <div
                            key={index}
                            className="w-40 h-64 sm:w-32 sm:h-52 flex-shrink-0 cursor-pointer relative 
                                       group transition-transform duration-300 hover:scale-105"
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            {/* Gambar Full */}
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover rounded-lg"
                            />

                            {/* Overlay Gelap di Bagian Bawah Saja */}
                            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent 
                                            rounded-b-lg transition-opacity duration-300" />

                            {/* Judul Film */}
                            <div className="absolute bottom-2 w-full text-center transition-all duration-300 
                                            transform group-hover:-translate-y-1">
                                <p className="font-bold text-sm">{movie.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UpComingMovie;
