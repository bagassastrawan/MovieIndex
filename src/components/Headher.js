import React, { useEffect, useState } from 'react'
import logo from '../assets/logomovie.png'
import { Link, NavLink, useNavigate, } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../constants/navigation';


const Headher = () => {
    const navigate = useNavigate()
    const [SearchInput, setSearchInput] = useState('')

    useEffect(() => {
        if (SearchInput) {
            navigate(`/search?q=${SearchInput}`)
        }
    }, [SearchInput])


    const handleSubmit = (e) => {
        e.preventDefauld()
    }

    return (
        <Headher className='fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75'>
            <div className='container mx-auto px-4 flex items-center h-full'>
                <Link to={"/"}>
                    <img
                        src={logo}
                        alt='logomovie'
                        width={120}
                    />
                </Link>

                <nav className='hidden lg:flex items-center gap-1 ml-5'>
                    {
                        navigation.map((nav, index) => {
                            return (
                                <div key={index}>
                                    <NavLink key={nav.label} to={nav.href} className={({ isActive }) => `px-3 hover:text-neutral-100 ${isActive && "text-neutral-200"}`}>
                                        {nav.label}
                                    </NavLink>
                                </div>
                            )
                        })
                    }
                </nav>
                <div className='ml-auto flex items-center gap-5'>
                    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Search here...'
                            className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={setSearchInput}
                        />
                        <button className='text-2xl text-white'>
                            <IoSearchOutline />
                        </button>
                    </form>
                    <div className='text-2xl text-white'>
                        <IoSearchOutline />
                    </div>
                </div>
            </div>
        </Headher>
    )
}

export default Headher
