import React, { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import PaginationInfo from '../PaginationInfo';
import { useNavigate } from 'react-router-dom';
import { getColumnsForWidth } from './columnsConfig';
import { filterEmployees } from './employeeFilter';
import './employeeTable.scss';

createTheme('custom', {
    divider: {
        default: '#073642',
    },
});

const EmployeeTable = ({ employees = [], search = '', departmentFilter = '', stateFilter = '' }) => {

    const [columns, setColumns] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();


    // Gestion de la taille de l'écran
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Définir dynamiquement les colonnes en fonction de la taille de l’écran
    useEffect(() => {
        setColumns(getColumnsForWidth(windowWidth));
    }, [windowWidth]);

    // Filtrage des employés
    const filteredData = filterEmployees(employees, search, departmentFilter, stateFilter);

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