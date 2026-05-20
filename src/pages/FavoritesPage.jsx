import React from 'react';
import { useAppContext } from '../context/AppContext';
import MovieList from '../components/MovieList';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
    const { favorites } = useAppContext();

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>My Favorites</h1>

            {favorites.length > 0 ? (
                <MovieList movies={favorites} />
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                    <h2>No favorites yet</h2>
                    <p>Start adding movies to your list!</p>
                    <Link
                        to="/movies"
                        style={{
                            display: 'inline-block',
                            marginTop: '1rem',
                            color: 'var(--primary-color)',
                            textDecoration: 'underline'
                        }}
                    >
                        Browse Movies
                    </Link>
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;
