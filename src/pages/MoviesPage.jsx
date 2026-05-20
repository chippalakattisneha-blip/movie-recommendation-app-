import React, { useState, useMemo } from 'react';
import { movies } from '../data/movies';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

// Functional component (Unit 2)
// Hooks: useState, useMemo (Unit 5)
const MoviesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeGenre, setActiveGenre] = useState('All');
    const [activeLanguage, setActiveLanguage] = useState('All');
    const [sortOption, setSortOption] = useState('rating');

    // Extract unique genres and languages
    const genres = [...new Set(movies.flatMap(m => m.genres))].sort();
    const languages = [...new Set(movies.map(m => m.language))].sort();

    const handleClearFilters = () => {
        setSearchQuery('');
        setActiveGenre('All');
        setActiveLanguage('All');
        setSortOption('rating');
    };

    // Filter and Sort Logic (Unit 5 - Optimization with useMemo)
    const filteredMovies = useMemo(() => {
        let result = movies;

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(m =>
                m.title.toLowerCase().includes(query) ||
                m.description.toLowerCase().includes(query)
            );
        }

        // Filter by Genre
        if (activeGenre !== 'All') {
            result = result.filter(m => m.genres.includes(activeGenre));
        }

        // Filter by Language
        if (activeLanguage !== 'All') {
            result = result.filter(m => m.language === activeLanguage);
        }

        // Sort
        result = [...result].sort((a, b) => {
            if (sortOption === 'rating') {
                return b.rating - a.rating;
            } else if (sortOption === 'year') {
                return b.year - a.year;
            }
            return 0;
        });

        return result;
    }, [searchQuery, activeGenre, activeLanguage, sortOption]);

    // Pagination / Load More (Unit 5)
    const [visibleCount, setVisibleCount] = useState(8);
    const visibleMovies = filteredMovies.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Explore Movies</h1>

            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <FilterBar
                genres={genres}
                languages={languages}
                activeGenre={activeGenre}
                setActiveGenre={setActiveGenre}
                activeLanguage={activeLanguage}
                setActiveLanguage={setActiveLanguage}
                sortOption={sortOption}
                setSortOption={setSortOption}
                onClear={handleClearFilters}
            />

            <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Showing {visibleMovies.length} of {filteredMovies.length} results
            </div>

            <MovieList movies={visibleMovies} />

            {visibleCount < filteredMovies.length && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                        onClick={handleLoadMore}
                        style={{
                            padding: '0.8rem 2rem',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--text-secondary)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            color: 'var(--text-primary)'
                        }}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default MoviesPage;
