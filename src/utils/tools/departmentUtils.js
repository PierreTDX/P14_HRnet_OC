export function createDepartmentOptions(filteredEmployees) {
    return [...new Set(filteredEmployees.map(emp => emp.department))]
        .filter(Boolean)
        .sort()
        .map(dep => ({ value: dep, label: dep }));
}