import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetails = () => {
    const [data, setData] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                    headers: { "Authorization": `Bearer ${import.meta.env.VITE_ACCES_TOKEN}` }
                });
                const movieData = await res.json();
                setData(movieData);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchTrailer = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
                    headers: { "Authorization": `Bearer ${import.meta.env.VITE_ACCES_TOKEN}` }
                });
                const videoData = await res.json();
                const officialTrailer = videoData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
                if (officialTrailer) {
                    setTrailer(`https://www.youtube.com/embed/${officialTrailer.key}?autoplay=1`);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchCast = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                    headers: { "Authorization": `Bearer ${import.meta.env.VITE_ACCES_TOKEN}` }
                });
                const castData = await res.json();
                setCast(castData.cast.slice(0, 10));
            } catch (error) {
                console.log(error);
            }
        };

        const fetchGallery = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
                    headers: { "Authorization": `Bearer ${import.meta.env.VITE_ACCES_TOKEN}` }
                });
                const imageData = await res.json();
                setGallery(imageData.backdrops.slice(0, 10));
            } catch (error) {
                console.log(error);
            }
        };

        const fetchRecommendations = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`, {
                    headers: { "Authorization": `Bearer ${import.meta.env.VITE_ACCES_TOKEN}` }
                });
                const recommendationData = await res.json();
                setRecommendations(recommendationData.results.slice(0, 10));
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovieDetails();
        fetchTrailer();
        fetchCast();
        fetchGallery();
        fetchRecommendations();
    }, [movieId]);

    return (
        <div>
            {data && (
                <div className="relative w-full min-h-screen text-white">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} alt={data.title} className="w-full h-full object-cover absolute top-0 left-0 z-[-1]" />
                    <div className="relative z-10 p-10 grid md:grid-cols-3 gap-6 top-20">
                        <div className="md:col-span-2">
                            <h1 className="text-5xl font-bold mb-2">{data.title}</h1>
                            <div className="flex items-center gap-4 text-lg">
                                <span className="flex items-center gap-1"><span className="text-yellow-400 text-2xl">★</span>{data.vote_average.toFixed(1)}</span>
                                <span className="bg-red-600 px-3 py-1 rounded-full text-sm">Anime</span>
                            </div>
                            <p className="mt-4 text-gray-300 text-sm">#2 | {data.release_date?.split("-")[0]} | {data.runtime} min | {data.genres.map(g => g.name).join(", ")}</p>
                            <p className="mt-4 text-gray-300 text-sm leading-relaxed">{data.overview}</p>
                        </div>
                        {trailer && (
                            <iframe
                                className="w-full h-56 rounded-lg border border-gray-500"
                                src={trailer}
                                title="Movie Trailer"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            )}

            <div className="p-10">
                <h2 className="text-2xl font-semibold mb-4">Characters</h2>
                <div className="flex overflow-x-auto gap-4">
                    {cast.map(actor => (
                        <div key={actor.id} className="text-center min-w-[120px]">
                            <img className="w-full h-40 object-cover rounded-lg" src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                            <p className="text-sm font-medium mt-2">{actor.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery */}
            <div className="p-10">
                <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
                <div className="flex overflow-x-auto gap-4">
                    {gallery.map((image, index) => (
                        <img
                            key={index}
                            className="w-64 h-40 object-cover rounded-lg cursor-pointer"
                            src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                            alt="Gallery"
                        />
                    ))}
                </div>
            </div>

            <div className="p-10">
                <h2 className="text-2xl font-semibold mb-4">Recommended Anime</h2>
                <div className="flex overflow-x-auto gap-4">
                    {recommendations.map(movie => (
                        <Link to={`/movie/${movie.id}`} key={movie.id} className="text-center min-w-[150px]">
                            <img className="w-full h-56 object-cover rounded-lg" src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <p className="text-sm font-medium mt-2">{movie.title}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
