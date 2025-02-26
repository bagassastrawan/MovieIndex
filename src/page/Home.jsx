import React, { useEffect, useState } from 'react';
import TopMovie from '../components/homepage/TopMovie';
import PopulerMovie from '../components/homepage/PopulerMovie';
import UpcomingMovie from '../components/homepage/UpComingMovie';
import { fetchData } from '../utils/fetchData';

const Home = () => {
    const [topMovie, setTopMovie] = useState([]);
    const [popularMovie, setPopularMovie] = useState([]);
    const [upcomingMovie, setUpcomingMovie] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);

                const [topData, popularData, upcomingData] = await Promise.all([
                    fetchData({ url: 'movie/top_rated?language=en-US&page=1' }),
                    fetchData({ url: 'movie/popular?language=en-US&page=1' }),
                    fetchData({ url: 'movie/upcoming?language=en-US&page=1' })
                ]);

                setTopMovie(topData?.results || []);
                setPopularMovie(popularData?.results || []);
                setUpcomingMovie(upcomingData?.results || []);
            } catch (err) {
                setError('Failed to fetch movies. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) return <p className="text-center text-white">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div>
            <TopMovie data={topMovie} />
            <PopulerMovie data={popularMovie} />
            <UpcomingMovie data={upcomingMovie} />
        </div>
    );
};

export default Home;
