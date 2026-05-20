import React from 'react';
import styles from './SearchBar.module.css';


const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.input}
            />
        </div>
    );
};

export default SearchBar;
