import { useEffect, useState } from 'react';

export function useLocalEmployees() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const dataEmployees = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(dataEmployees);
    }, []);

    return employees;
}