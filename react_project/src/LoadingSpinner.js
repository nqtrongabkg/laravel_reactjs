import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoadingSpinner = () => {
    const overlayStyle = {
        position: 'absolute', // Hoặc 'fixed'
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    };

    const spinnerContainerStyle = {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div style={overlayStyle}>
            <div style={spinnerContainerStyle}>
                <div className="spinner-border text-primary" role="status">
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
