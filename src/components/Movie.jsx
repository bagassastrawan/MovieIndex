import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function Movie() {
    const [state, setState] = useState([])
    const data = [1, 2, 3, 4, 5, 6, 7]
    const filteredData = state.slice(0, 1);
    console.log(filteredData);
    const getAnime = async () => {
        try {
            const res = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
                method: "GET",
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDc2MTAxNzRmMTAwMTZmOTU0OTAxOGQ1ZGIxN2VkNyIsIm5iZiI6MTczMTIwNzc2My4xMjIwNTA1LCJzdWIiOiI2NzJmNjM4OTExYjZjYzA1NzFmNjIxNmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jgrl_n0NBvvD-yVLxp5P7QhhjJPhayOIjKg9421emcE'
                }
            })
            const result = await res.json();
            console.log(result);

            return setState(result.results)

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {
        getAnime();
    }, [])


    return (
        <div>

            {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

            {state?.map((item, key) => {
                return (
                    <NavLink to={`/movie/${item?.id}`}>
                        <div className=''>
                            <div className='flex'>
                                <div className='h-[200px] w-[200px]'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} className='h-full w-full bg-cover' alt="" />
                                </div>
                                <p key={key}>{item?.original_title}</p>
                                <p className='font-bold'>{item?.release_date}</p>
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}

export default Movie
