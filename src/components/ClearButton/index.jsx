import React from 'react';
import './clearButton.scss';

const ClearButton = ({ value, onChange, label = 'Clear' }) => {
    if (!value) return null;

    const handleClear = () => {
        onChange({ target: { value: '' } });
    };

    return (
        <button
            className="clearButton"
            onClick={handleClear}
            aria-label={label}
            title={label}
            type="button"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#555"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
    );
};

export default ClearButton;