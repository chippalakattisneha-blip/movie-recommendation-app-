import React, { useState, useEffect } from 'react';
import { movies } from '../data/movies';
import MovieList from '../components/MovieList';
import FeaturedMovieClass from '../components/FeaturedMovieClass';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

// Functional component (Unit 2)
// useEffect for loading data (Unit 5)
const HomePage = () => {
    const { recentlyViewed } = useAppContext();
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [featuredMovie, setFeaturedMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        const timer = setTimeout(() => {
            const recommended = movies.filter(m => m.isRecommended);
            const trending = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 4);

            setRecommendedMovies(recommended);
            setTrendingMovies(trending);
            setFeaturedMovie(movies[0]); // Just pick the first one as featured
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading movies...</div>;
    }

    return (
        <div>
            <FeaturedMovieClass movie={featuredMovie} />

            <section style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2>Recommended for You</h2>
                    <Link to="/movies" style={{ color: 'var(--primary-color)' }}>View All</Link>
                </div>
                <MovieList movies={recommendedMovies.slice(0, 4)} />
            </section>

            <section style={{ marginBottom: '3rem' }}>
                <h2>Trending Now</h2>
                <MovieList movies={trendingMovies} />
            </section>

            {recentlyViewed.length > 0 && (
                <section>
                    <h2>Recently Viewed</h2>
                    <MovieList movies={recentlyViewed} />
                </section>
            )}
        </div>
    );
};

export default HomePage;
