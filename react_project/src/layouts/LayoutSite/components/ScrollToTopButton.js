import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Import the up arrow icon from react-icons/fa

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = document.documentElement.scrollTop;
            setIsVisible(scrolled > 300); // Show the button when scrolling down 300 pixels
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
        >
            <FaArrowUp />
        </div>
    );
};

export default ScrollToTopButton;
