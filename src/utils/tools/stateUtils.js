export function buildStateMapping(states) {
    return states.reduce((acc, state) => {
        acc[state.abbreviation.toUpperCase()] = state.name;
        return acc;
    }, {});
}

export function createStateOptions(filteredEmployees, stateMapping) {
    return [...new Set(filteredEmployees.map(emp => emp.state))]
        .filter(Boolean)
        .sort()
        .map(state => ({
            value: state,
            label: stateMapping[state.toUpperCase()] || state,
        }));
}