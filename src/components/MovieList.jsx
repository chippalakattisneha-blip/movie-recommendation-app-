import React from 'react';
import MovieCard from './MovieCard';
import styles from './MovieList.module.css';

// Reusable component (Unit 2)
const MovieList = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return <div className={styles.empty}>No movies found matching your criteria.</div>;
    }

    return (
        <div className={styles.grid}>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieList;
