import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const [data, setData] = useState(null);
    const { movieId } = useParams();

    const fetchData = async () => {

        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDc2MTAxNzRmMTAwMTZmOTU0OTAxOGQ1ZGIxN2VkNyIsIm5iZiI6MTczMTIwNzc2My4xMjIwNTA1LCJzdWIiOiI2NzJmNjM4OTExYjZjYzA1NzFmNjIxNmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jgrl_n0NBvvD-yVLxp5P7QhhjJPhayOIjKg9421emcE'
                }
            });
            const data = await res.json();
            setData(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            {data?.title}
        </div>
    )
}

export default MovieDetails
