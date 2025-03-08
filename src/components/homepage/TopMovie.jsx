import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopMovie = ({ data }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
        }
    };

    return (
        <div className="bg-black text-white p-5 relative">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Top Movies</h1>
                <div className="flex items-center bg-gray-700 px-4 py-2 rounded-lg w-40 sm:w-60">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="bg-transparent text-white outline-none placeholder-gray-400 flex-1"
                    />
                    <button
                        onClick={() => searchQuery.trim() && navigate(`/search?q=${searchQuery}`)}
                        className="ml-2 text-gray-300 hover:text-white"
                    >
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto scrollbar-hide p-2">
                <div className="flex space-x-5">
                    {Array.isArray(data) && data.map((item, index) => (
                        <div
                            key={index}
                            className="w-40 h-64 sm:w-32 sm:h-52 flex-shrink-0 border border-white rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => navigate(`/movie/${item.id}`)}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                alt={item.title}
                                className="w-full h-48 sm:h-36 object-cover"
                            />
                            <p className="text-center font-bold text-sm p-2">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopMovie;
