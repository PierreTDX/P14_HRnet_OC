import { useEffect } from 'react';

export function useResetInvalidFilter(currentValue, validOptions, setValue) {
    useEffect(() => {
        const validValues = validOptions.map(opt => opt.value);
        if (currentValue && !validValues.includes(currentValue)) {
            setValue('');
        }
    }, [currentValue, validOptions, setValue]);
}