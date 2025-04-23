import { useMemo } from 'react';
import { normalizeString } from '../tools/normalizeString';

export function useFilteredEmployees(employees, search, departmentFilter, stateFilter) {
    const filteredBySearch = useMemo(() => {
        const terms = normalizeString(search).split(' ');
        return employees.filter(emp =>
            terms.every(term =>
                Object.values(emp).some(value =>
                    normalizeString(value).includes(term)
                )
            )
        );
    }, [employees, search]);

    const filteredByDepartment = useMemo(() => {
        if (!departmentFilter) return filteredBySearch;
        return filteredBySearch.filter(emp =>
            normalizeString(emp.department).includes(normalizeString(departmentFilter))
        );
    }, [filteredBySearch, departmentFilter]);

    const filteredByState = useMemo(() => {
        if (!stateFilter) return filteredBySearch;
        return filteredBySearch.filter(emp =>
            normalizeString(emp.state).includes(normalizeString(stateFilter))
        );
    }, [filteredBySearch, stateFilter]);

    return { filteredBySearch, filteredByDepartment, filteredByState };
}