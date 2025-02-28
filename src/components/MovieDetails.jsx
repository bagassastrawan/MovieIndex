import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
    const [data, setData] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); // Tambahkan state baru
    const { movieId } = useParams();
    const navigate = useNavigate();

    const fetchMovieDetails = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
                method: 'GET',
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_ACCES_TOKEN}`
                }
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
                method: 'GET',
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_ACCES_TOKEN}`
                }
            });
            const videoData = await res.json();
            const officialTrailer = videoData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            if (officialTrailer) {
                setTrailer(`https://www.youtube.com/embed/${officialTrailer.key}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCast = async () => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                method: 'GET',
                headers: {
                    "accept": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_ACCES_TOKEN}`
                }
            });

            const castData = await res.json();
            setCast(castData.cast.slice(0, 10)); // Ambil 10 pemeran utama
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovieDetails();
        fetchTrailer();
        fetchCast();
    }, [movieId]);

    return (
        <div className="p-4">
            <button className="mb-4 px-4 py-2 bg-gray-800 text-white rounded" onClick={() => navigate(-1)}>Go Back</button>
            {data && (
                <div>
                    <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
                    <p className="mb-4">{data.overview}</p>

                    {/* Tampilkan Gambar atau Trailer */}
                    {selectedImage ? (
                        <div className="mb-4">
                            <img src={selectedImage} alt="Selected" className="w-full h-80 object-cover rounded-lg" />
                        </div>
                    ) : trailer ? (
                        <div className="mb-4">
                            <h2 className="text-2xl font-semibold">Trailer</h2>
                            <iframe
                                width="100%"
                                height="400"
                                src={trailer}
                                title="Movie Trailer"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : null}

                    <h2 className="text-2xl font-semibold mb-2">Cast</h2>
                    <div className="flex overflow-x-auto gap-4">
                        {cast.map(actor => (
                            <div key={actor.id} className="w-32 text-center">
                                <img
                                    className="w-full h-40 object-cover rounded-lg cursor-pointer"
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                    alt={actor.name}
                                    onClick={() => setSelectedImage(`https://image.tmdb.org/t/p/w500${actor.profile_path}`)}
                                />
                                <p className="text-sm font-medium">{actor.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetails;
