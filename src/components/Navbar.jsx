import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 fixed w-full bg-gray-600 shadow-md">
            {/* Bagian Kiri: Menu */}
            <div className="flex space-x-8">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "text-red-500" : "text-gray-200"} hover:text-red-400`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "text-red-500" : "text-gray-200"} hover:text-red-400`
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "text-red-500" : "text-gray-200"} hover:text-red-400`
                    }
                >
                    Contact
                </NavLink>
            </div>

            {/* Bagian Kanan: Tombol Search */}
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-4 py-2 rounded-lg bg-gray-300 focus:outline-none"
                />
            </div>
        </nav>
    );
};

export default Navbar;
