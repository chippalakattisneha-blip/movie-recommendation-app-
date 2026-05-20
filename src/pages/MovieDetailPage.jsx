import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movies } from '../data/movies';
import { useAppContext } from '../context/AppContext';
import MovieList from '../components/MovieList';
import styles from './MovieDetailPage.module.css';

// Routing with params (Unit 4)
// useEffect for side effects (Unit 5)
const MovieDetailPage = () => {
    const { id } = useParams();
    const { addToFavorites, removeFromFavorites, isFavorite, addToRecentlyViewed } = useAppContext();
    const [movie, setMovie] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);

    useEffect(() => {
        // Scroll to top when id changes
        window.scrollTo(0, 0);

        const foundMovie = movies.find(m => m.id === parseInt(id));
        setMovie(foundMovie);

        if (foundMovie) {
            addToRecentlyViewed(foundMovie);
            // Simple recommendation logic: same genre or language, excluding current
            const related = movies.filter(m =>
                m.id !== foundMovie.id &&
                (m.genres.some(g => foundMovie.genres.includes(g)) || m.language === foundMovie.language)
            ).slice(0, 4);
            setRelatedMovies(related);
        }
    }, [id]);

    if (!movie) {
        return <div className={styles.notFound}>Movie not found</div>;
    }

    const isFav = isFavorite(movie.id);

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.posterWrapper}>
                    <img src={movie.poster} alt={movie.title} className={styles.poster} />
                </div>
                <div className={styles.info}>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <div className={styles.meta}>
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <span>{movie.language}</span>
                    </div>

                    <div className={styles.rating}>
                        Rating: <strong>{movie.rating}/10</strong>
                    </div>

                    <div className={styles.genres}>
                        {movie.genres.map(g => (
                            <span key={g} className={styles.genre}>{g}</span>
                        ))}
                    </div>

                    <p className={styles.description}>{movie.description}</p>

                    <div className={styles.actions}>
                        <button
                            onClick={() => isFav ? removeFromFavorites(movie.id) : addToFavorites(movie)}
                            className={`${styles.favBtn} ${isFav ? styles.active : ''}`}
                        >
                            {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.recommendations}>
                <h2>You Might Also Like</h2>
                <MovieList movies={relatedMovies} />
            </div>
        </div>
    );
};

export default MovieDetailPage;
