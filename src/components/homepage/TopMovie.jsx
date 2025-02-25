import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopMovie = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white p-5">
            <h1 className="text-3xl font-bold mb-4">Top Anime</h1>
            <div className="overflow-x-scroll whitespace-nowrap scrollbar-hide flex space-x-5">
                {Array.isArray(data) && data.map((item, index) => (
                    <div
                        key={index}
                        className="w-40 flex-shrink-0 border border-white rounded-lg p-2 cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => navigate(`/movie/${item.id}`)}
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                            alt={item.title}
                            className="w-full h-56 object-cover rounded-lg"
                        />
                        <p className="text-center text-sm mt-2">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopMovie;
