import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import styles from './MovieCard.module.css';

// Reusable component (Unit 2)
const MovieCard = ({ movie }) => {
    const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useAppContext();
    const isFav = isFavorite(movie.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Prevent navigation if clicking the button
        if (isFav) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    return (
        <div className={styles.card}>
            <Link to={`/movie/${movie.id}`} className={styles.link}>
                <div className={styles.posterWrapper}>
                    <img src={movie.poster} alt={movie.title} className={styles.poster} loading="lazy" />
                    <div className={styles.overlay}>
                        <button
                            onClick={handleFavoriteClick}
                            className={`${styles.favButton} ${isFav ? styles.active : ''}`}
                            aria-label={isFav ? "Remove from Favorites" : "Add to Favorites"}
                        >
                            {isFav ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{movie.title}</h3>
                    <div className={styles.meta}>
                        <span className={styles.year}>{movie.year}</span>
                        <span className={styles.rating}>⭐ {movie.rating}</span>
                    </div>
                    <div className={styles.genres}>
                        {movie.genres.slice(0, 2).map(g => (
                            <span key={g} className={styles.genre}>{g}</span>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
