import React, { useState } from 'react';
import styles from './FeedbackPage.module.css';
import { movies } from '../data/movies';

// Events and form handling (Unit 3)
const FeedbackPage = () => {
    const [formData, setFormData] = useState({
        movieName: '',
        email: '',
        rating: '5',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Controlled form inputs (Unit 3)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.movieName.trim()) {
            newErrors.movieName = 'Movie Name is required';
        } else {
            const movieExists = movies.some(m => m.title.toLowerCase() === formData.movieName.trim().toLowerCase());
            if (!movieExists) {
                newErrors.movieName = 'Movie not found in our database';
            }
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        else if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';

        return newErrors;
    };

    // Prevent default form submission (Unit 3)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save to local storage to simulate persistence
        const existingFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
        localStorage.setItem('feedback', JSON.stringify([...existingFeedback, { ...formData, date: new Date().toISOString() }]));

        console.log('Form submitted:', formData);
        setIsLoading(false);
        setSubmitted(true);
        setFormData({ movieName: '', email: '', rating: '5', message: '' });
    };

    if (submitted) {
        return (
            <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h2>Thank You!</h2>
                <p>Your feedback has been received and saved.</p>
                <button onClick={() => setSubmitted(false)} className={styles.button}>
                    Send Another Response
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>We Value Your Feedback</h1>
            <p className={styles.subtitle}>Let us know what you think about MovieMatch</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="movieName">Movie Name</label>
                    <input
                        type="text"
                        id="movieName"
                        name="movieName"
                        value={formData.movieName}
                        onChange={handleChange}
                        className={errors.movieName ? styles.errorInput : ''}
                        placeholder="Enter movie name (e.g., Inception)"
                        disabled={isLoading}
                    />
                    {errors.movieName && <span className={styles.errorText}>{errors.movieName}</span>}
                </div>

                <div className={styles.field}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? styles.errorInput : ''}
                        placeholder="your.email@example.com"
                        disabled={isLoading}
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.field}>
                    <label htmlFor="rating">Rating</label>
                    <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        disabled={isLoading}
                    >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className={errors.message ? styles.errorInput : ''}
                        placeholder="Tell us about your experience..."
                        disabled={isLoading}
                    ></textarea>
                    {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                </div>

                <button type="submit" className={styles.button} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Feedback'}
                </button>
            </form>
        </div>
    );
};

export default FeedbackPage;
