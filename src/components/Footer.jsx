import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-secondary)',
            marginTop: 'auto'
        }}>
            <p>&copy; {new Date().getFullYear()} MovieMatch. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
