import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedMovieClass.module.css';


class FeaturedMovieClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            timer: 0
        };
    }

    componentDidMount() {
        // Simulate a fade-in effect or data fetch
        this.fadeInTimer = setTimeout(() => {
            this.setState({ isVisible: true });
        }, 500);

        // Simple timer to show lifecycle unmount
        this.interval = setInterval(() => {
            this.setState(prevState => ({ timer: prevState.timer + 1 }));
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.fadeInTimer);
        clearInterval(this.interval);
    }

    render() {
        const { movie } = this.props;
        const { isVisible } = this.state;

        if (!movie) return null;

        return (
            <div
                className={styles.featured}
                style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease-in' }}
            >
                <div className={styles.content}>
                    <span className={styles.label}>Featured Movie</span>
                    <h2 className={styles.title}>{movie.title}</h2>
                    <p className={styles.desc}>{movie.description}</p>
                    <Link to={`/movie/${movie.id}`} className={styles.button}>
                        Watch Now
                    </Link>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={movie.poster} alt={movie.title} className={styles.image} />
                </div>
            </div>
        );
    }
}

export default FeaturedMovieClass;
