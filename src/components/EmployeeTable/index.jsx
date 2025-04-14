import React, { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import PaginationInfo from '../PaginationInfo';
import { useNavigate } from 'react-router-dom';
import './employeeTable.scss';


createTheme('custom', {
    divider: {
        default: '#073642',
    },
});

const EmployeeTable = ({ search = '', departmentFilter = '', stateFilter = '' }) => {
    const [employees, setEmployees] = useState([]);
    const [columns, setColumns] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    // Récupération des employés depuis le localStorage
    useEffect(() => {
        const employeesData = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(employeesData);
    }, []);

    // Gestion de la taille de l'écran
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Définir dynamiquement les colonnes en fonction de la taille de l’écran
    useEffect(() => {
        const baseColumns = [
            { name: 'First Name', selector: row => row.firstName, sortable: true },
            { name: 'Last Name', selector: row => row.lastName, sortable: true },
        ];

        if (windowWidth <= 425) {
            setColumns(baseColumns);
        } else if (windowWidth <= 768) {
            setColumns([
                ...baseColumns,
                { name: 'Start Date', selector: row => row.startDate, sortable: true },
                { name: 'Department', selector: row => row.department, sortable: true },
            ]);
        } else if (windowWidth <= 1024) {
            setColumns([
                ...baseColumns,
                { name: 'Start Date', selector: row => row.startDate, sortable: true },
                { name: 'Department', selector: row => row.department, sortable: true },
                { name: 'Street', selector: row => row.street, sortable: true },
                { name: 'City', selector: row => row.city, sortable: true },
            ]);
        } else {
            setColumns([
                ...baseColumns,
                { name: 'Start Date', selector: row => row.startDate, sortable: true },
                { name: 'Department', selector: row => row.department, sortable: true },
                { name: 'Date of Birth', selector: row => row.dateOfBirth, sortable: true },
                { name: 'Street', selector: row => row.street, sortable: true },
                { name: 'City', selector: row => row.city, sortable: true },
                { name: 'State', selector: row => row.state, sortable: true, width: '90px' },
                { name: 'Zip Code', selector: row => row.zipCode, sortable: true, width: '118px' },
            ]);
        }
    }, [windowWidth]);

    // Filtrage des employés
    const filteredData = employees.filter(item => {
        // Vérifie que les valeurs de search, stateFilter et departmentFilter ne sont pas vides
        const searchTerms = search.trim().toLowerCase().split(' ');
        const matchesSearch = searchTerms.every(term =>
            Object.values(item).some(value =>
                value.toString().toLowerCase().includes(term)
            )
        );

        const matchesState = stateFilter.trim().toLowerCase() === '' || item.state.toLowerCase().includes(stateFilter.toLowerCase());
        const matchesDep = departmentFilter.trim().toLowerCase() === '' || item.department.toLowerCase().includes(departmentFilter.toLowerCase());

        return matchesSearch && matchesState && matchesDep;
    });

    const handleRowClicked = (row) => {
        navigate('/detailemployees', { state: { employee: row } });
    };

    return (
        <>
            <DataTable
                className="customTable"
                columns={columns}
                data={filteredData} // Utilisation des données filtrées
                pagination
                pointerOnHover
                striped
                ariaLabel
                theme="custom"
                onRowClicked={handleRowClicked}
                persistTableHead
            />

            <PaginationInfo
                filteredCount={filteredData.length} // Nombre d'éléments après filtre
                totalCount={employees.length}        // Nombre total d'éléments
            />
        </>
    );
};

export default EmployeeTable;