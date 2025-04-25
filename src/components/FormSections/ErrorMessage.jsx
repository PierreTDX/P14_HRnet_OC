import React from 'react';

function ErrorMessage({ name, errors }) {
    return (
        <p
            id={`${name}Error`}
            role="alert"
            aria-live="assertive"
            className={`errorMessage ${errors[name] ? '' : 'invisible'}`}
        >
            {errors[name]?.message || '\u00A0'}
        </p>
    );
}

export default ErrorMessage;