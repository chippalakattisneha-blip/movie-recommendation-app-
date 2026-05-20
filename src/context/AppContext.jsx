import React, { createContext, useState, useEffect, useContext } from 'react';

// Create Context
const AppContext = createContext();

// Custom Hook for using context
export const useAppContext = () => useContext(AppContext);

// Provider Component
export const AppProvider = ({ children }) => {
    // Theme State
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    // Favorites State
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    // Recently Viewed State
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const saved = localStorage.getItem('recentlyViewed');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist Theme
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme; // Apply theme class to body
    }, [theme]);

    // Persist Favorites
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Persist Recently Viewed
    useEffect(() => {
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    // Handlers
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const addToFavorites = (movie) => {
        setFavorites(prev => {
            if (prev.some(fav => fav.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    const addToRecentlyViewed = (movie) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(m => m.id !== movie.id);
            return [movie, ...filtered].slice(0, 5); // Keep last 5
        });
    };

    const value = {
        theme,
        toggleTheme,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        recentlyViewed,
        addToRecentlyViewed
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
