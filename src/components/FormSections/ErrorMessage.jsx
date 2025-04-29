import React from 'react';

function ErrorMessage({ name, errors, show = true }) {
    const isVisible = errors[name] && show;

    return (
        <p
            id={`${name}Error`}
            role="alert"
            aria-live="assertive"
            className={`errorMessage ${isVisible ? '' : 'invisible'}`}
        >
            {isVisible ? errors[name].message : '\u00A0'}
        </p>
    );
}

export default ErrorMessage;