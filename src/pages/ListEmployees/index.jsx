import React, { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import './listEmployees.scss';

// Fonction pour convertir les dates en format ISO
const formatDate = (dateStr) => {
    const [month, day, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`).toISOString();
};

createTheme(
    'custom',
    {
        divider: {
            default: '#073642',
        },
    }
);

const columns = [
    { name: 'First Name', selector: row => row.firstName, sortable: true },
    { name: 'Last Name', selector: row => row.lastName, sortable: true },
    {
        name: 'Start Date',
        selector: row => new Date(formatDate(row.startDate)), // pour le tri
        sortable: true,
        format: row => row.startDate // pour l'affichage
    },
    { name: 'Department', selector: row => row.department, sortable: true },
    {
        name: 'Date of Birth',
        selector: row => new Date(formatDate(row.dateOfBirth)),
        sortable: true,
        format: row => row.dateOfBirth
    },
    { name: 'Street', selector: row => row.street, sortable: true },
    { name: 'City', selector: row => row.city, sortable: true },
    {
        name: 'State',
        selector: row => row.state,
        sortable: true,
        width: '90px'
    },
    {
        name: 'Zip Code',
        selector: row => row.zipCode,
        sortable: true,
        width: '118px'

    }
];

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Récupérer les données depuis le localStorage
        const employeesData = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(employeesData);
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    // Filtrer les données en fonction de la recherche
    const filteredData = employees.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    return (
        <>
            <h1 className='pageTitle'>Current Employees</h1>
            <main>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search all columns"
                        value={search}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
                <div className='tableContent'>
                    <DataTable
                        className='customTable'
                        columns={columns}
                        data={filteredData}
                        pagination
                        pointerOnHover
                        striped
                        ariaLabel
                        theme="custom"
                    />
                </div>
            </main>
        </>
    );
};

export default ListEmployees;