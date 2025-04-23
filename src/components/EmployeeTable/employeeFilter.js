import { normalizeString } from "../../utils/tools/normalizeString";

export const filterEmployees = (employees, search = '', departmentFilter = '', stateFilter = '') => {
    return employees.filter(item => {
        const searchTerms = normalizeString(search).split(' ');

        const matchesSearch = searchTerms.every(term =>
            Object.values(item).some(value =>
                normalizeString(value).includes(term)
            )
        );

        const matchesState = normalizeString(item.state).includes(normalizeString(stateFilter));
        const matchesDep = normalizeString(item.department).includes(normalizeString(departmentFilter));

        return matchesSearch && matchesState && matchesDep;
    });
};