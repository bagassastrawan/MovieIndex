import React from 'react'
import { NavLink } from 'react-router-dom'
// import imgUrl from './assets/logo_movie.png';


const Navbar = () => {
    const imgUrl = "./assets/logo_movie.png"
    return (
        <nav className="flex items-center justify-between px-6 py-4 fixed w-full bg-transparent shadow-md">
            {/* Bagian Kiri: Logo dan Tulisan */}
            <div className="flex items-center space-x-2">
                <img
                    src={imgUrl} // Ganti dengan logo Anda
                    alt="Logo"
                    className="h-10 w-10"
                />
                <span className="text-xl font-bold">MovieIndex</span>
            </div>

            {/* Bagian Tengah: Menu */}
            <div className="flex space-x-8">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "text-gray-500" : "text-white"
                        } hover:text-white`
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "text-red-500" : "text-gray-700"
                        } hover:text-red-400`
                    }
                >
                    About
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `text-lg font-semibold ${isActive ? "text-red-500" : "text-gray-700"
                        } hover:text-red-400`
                    }
                >
                    Contact
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar
