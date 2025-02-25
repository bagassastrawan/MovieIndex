import React, { useEffect, useState } from 'react';
import TopMovie from '../components/homepage/TopMovie';
import PopulerMovie from '../components/homepage/PopulerMovie';
import UpcomingMovie from '../components/homepage/UpComingMovie';
import { fetchData } from '../utils/fetchData';

const Home = () => {
    const [topMovie, setTopMovie] = useState([]);
    const [popularMovie, setPopularMovie] = useState([]);
    const [upcomingMovie, setUpcomingMovie] = useState([]);

    useEffect(() => {
        async function fetchTopMovies() {
            const data = await fetchData({
                url: 'movie/top_rated?language=en-US&page=1'
            });
            setTopMovie(data);
        }

        async function fetchPopularMovies() {
            const data = await fetchData({
                url: 'movie/popular?language=en-US&page=1'
            });
            setPopularMovie(data);
        }

        async function fetchUpcomingMovies() {
            const data = await fetchData({
                url: 'movie/upcoming?language=en-US&page=1'
            });
            setUpcomingMovie(data);
        }

        fetchTopMovies();
        fetchPopularMovies();
        fetchUpcomingMovies();
    }, []);

    return (
        <div>
            <TopMovie data={topMovie?.results} />
            <PopulerMovie data={popularMovie?.results} />
            <UpcomingMovie data={upcomingMovie?.results} />
        </div>
    );
};

export default Home;
