import { useState } from 'react';

export const useFilterToggle = (setDepartmentFilter, setStateFilter) => {
    const [filterStep, setFilterStep] = useState(0);
    const [showDepartmentSearch, setShowDepartmentSearch] = useState(false);
    const [showStateSearch, setShowStateSearch] = useState(false);

    const handleToggleFilterInputs = () => {
        if (filterStep === 0) {
            setShowDepartmentSearch(true);
            setFilterStep(1);
        } else if (filterStep === 1) {
            setShowStateSearch(true);
            setFilterStep(2);
        } else {
            // Reset all
            setShowDepartmentSearch(false);
            setShowStateSearch(false);
            setDepartmentFilter('');
            setStateFilter('');
            setFilterStep(0);
        }
    };

    return {
        filterStep,
        showDepartmentSearch,
        showStateSearch,
        handleToggleFilterInputs
    };
};