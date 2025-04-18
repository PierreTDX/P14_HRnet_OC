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

        // Fonction de comparaison des chaînes en ignorant les accents
        const compareStringIgnoreAccent = (a, b) => {
            const normalizedA = normalizeString(a);
            const normalizedB = normalizeString(b);
            return normalizedA.localeCompare(normalizedB);
        };

        // Fonction dynamique de tri
        const sortByFieldIgnoreAccent = (field) => (a, b) =>
            compareStringIgnoreAccent(a[field], b[field]);

        const baseColumns = [
            {
                name: 'First Name',
                selector: row => row.firstName,
                sortable: true,
                sortFunction: sortByFieldIgnoreAccent('firstName')
            },
            { name: 'Last Name', selector: row => row.lastName, sortable: true, sortFunction: sortByFieldIgnoreAccent('lastName') },
        ];

        if (windowWidth <= 425) {
            setColumns(baseColumns);
        } else if (windowWidth <= 768) {
            setColumns([
                ...baseColumns,
                { name: 'Start Date', selector: row => row.startDate, sortable: true, sortFunction: (a, b) => new Date(a.startDate) - new Date(b.startDate) },
                { name: 'Department', selector: row => row.department, sortable: true, sortFunction: sortByFieldIgnoreAccent('department') },
            ]);
        } else if (windowWidth <= 1024) {
            setColumns([
                ...baseColumns,
                { name: 'Start Date', selector: row => row.startDate, sortable: true, sortFunction: (a, b) => new Date(a.startDate) - new Date(b.startDate) },
                { name: 'Department', selector: row => row.department, sortable: true, sortFunction: sortByFieldIgnoreAccent('department') },
                { name: 'Street', selector: row => row.street, sortable: true, sortFunction: sortByFieldIgnoreAccent('street') },
                { name: 'City', selector: row => row.city, sortable: true, sortFunction: sortByFieldIgnoreAccent('city') },
            ]);
        } else {
            setColumns([
                ...baseColumns,
                { name: 'Start Date', selector: row => row.startDate, sortable: true, sortFunction: (a, b) => new Date(a.startDate) - new Date(b.startDate) },
                { name: 'Department', selector: row => row.department, sortable: true, sortFunction: sortByFieldIgnoreAccent('department') },
                { name: 'Date of Birth', selector: row => row.dateOfBirth, sortable: true, sortFunction: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth) },
                { name: 'Street', selector: row => row.street, sortable: true, sortFunction: sortByFieldIgnoreAccent('street') },
                { name: 'City', selector: row => row.city, sortable: true, sortFunction: sortByFieldIgnoreAccent('city') },
                { name: 'State', selector: row => row.state, sortable: true, width: '90px', sortFunction: sortByFieldIgnoreAccent('state') },
                { name: 'Zip Code', selector: row => row.zipCode, sortable: true, width: '118px' },
            ]);
        }
    }, [windowWidth]);

    const normalizeString = (str) => {
        return (str || '')
            .toString()
            .normalize("NFD")                // décompose les lettres accentuées
            .replace(/[\u0300-\u036f]/g, "") // supprime les accents
            .toLowerCase()                  // convertit en minuscules
            .trim();                        // supprime les espaces en début/fin
    };

    // Filtrage des employés
    const filteredData = employees.filter(item => {
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