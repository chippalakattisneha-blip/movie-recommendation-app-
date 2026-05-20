import React from 'react';
import styles from './FilterBar.module.css';

// Events and form handling (Unit 3)
const FilterBar = ({
    genres,
    languages,
    activeGenre,
    setActiveGenre,
    activeLanguage,
    setActiveLanguage,
    sortOption,
    setSortOption,
    onClear
}) => {
    return (
        <div className={styles.bar}>
            <div className={styles.group}>
                <select
                    value={activeGenre}
                    onChange={(e) => setActiveGenre(e.target.value)}
                    className={styles.select}
                >
                    <option value="All">All Genres</option>
                    {genres.map(g => <option key={g} value={g}>{g}</option>)}
                </select>

                <select
                    value={activeLanguage}
                    onChange={(e) => setActiveLanguage(e.target.value)}
                    className={styles.select}
                >
                    <option value="All">All Languages</option>
                    {languages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className={styles.select}
                >
                    <option value="rating">Sort by Rating</option>
                    <option value="year">Sort by Year</option>
                </select>
            </div>

            <button onClick={onClear} className={styles.clearBtn}>
                Clear Filters
            </button>
        </div>
    );
};

export default FilterBar;
