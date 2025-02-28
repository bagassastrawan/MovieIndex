import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === "Enter" && searchQuery.trim() !== "") {
            navigate(`/search?q=${searchQuery}`);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
                {/* Menu */}
                <div className="flex space-x-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-lg font-semibold ${isActive ? "text-blue-400" : "text-gray-200"} hover:text-blue-400`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/anime"
                        className={({ isActive }) =>
                            `text-lg font-semibold ${isActive ? "text-blue-400" : "text-gray-200"} hover:text-blue-400`
                        }
                    >
                        Anime
                    </NavLink>
                </div>

                {/* Input Pencarian */}
                <div className="flex items-center bg-gray-700 px-4 py-2 rounded-lg">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                        className="bg-transparent text-white outline-none placeholder-gray-400 w-40 sm:w-60"
                    />
                    <button
                        onClick={() => searchQuery.trim() && navigate(`/search?q=${searchQuery}`)}
                        className="ml-2 text-gray-300 hover:text-white"
                    >
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
