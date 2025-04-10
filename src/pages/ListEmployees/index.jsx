import React, { useState, useEffect } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import './listEmployees.scss';

// Créer un thème personnalisé
createTheme(
    'custom',
    {
        divider: {
            default: '#073642',
        },
    }
);

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [columns, setColumns] = useState([
        { name: 'First Name', selector: row => row.firstName, sortable: true },
        { name: 'Last Name', selector: row => row.lastName, sortable: true },
    ]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Récupérer les données depuis le localStorage
        const employeesData = JSON.parse(localStorage.getItem('employees')) || [];
        setEmployees(employeesData);

        // Fonction pour mettre à jour la largeur de la fenêtre
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Ajouter un event listener pour la taille de la fenêtre
        window.addEventListener('resize', handleResize);

        // Nettoyer l'event listener lors du démontage du composant
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Filtrer les données en fonction de la recherche
    const filteredData = employees.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    // Mettre à jour les colonnes affichées en fonction de la largeur de l'écran
    useEffect(() => {
        if (windowWidth <= 425) {
            setColumns([
                { name: 'First Name', selector: row => row.firstName, sortable: true },
                { name: 'Last Name', selector: row => row.lastName, sortable: true }
            ]);
        } else if (windowWidth > 425 && windowWidth <= 768) {
            setColumns([
                { name: 'First Name', selector: row => row.firstName, sortable: true },
                { name: 'Last Name', selector: row => row.lastName, sortable: true },
                { name: 'Start Date', selector: row => new Date(row.startDate), sortable: true, format: row => row.startDate },
                { name: 'Department', selector: row => row.department, sortable: true }
            ]);
        } else if (windowWidth > 768 && windowWidth <= 1024) {
            setColumns([
                { name: 'First Name', selector: row => row.firstName, sortable: true },
                { name: 'Last Name', selector: row => row.lastName, sortable: true },
                { name: 'Start Date', selector: row => new Date(row.startDate), sortable: true, format: row => row.startDate },
                { name: 'Department', selector: row => row.department, sortable: true },
                { name: 'Street', selector: row => row.street, sortable: true },
                { name: 'City', selector: row => row.city, sortable: true }
            ]);
        } else if (windowWidth > 1024) {
            setColumns([
                { name: 'First Name', selector: row => row.firstName, sortable: true },
                { name: 'Last Name', selector: row => row.lastName, sortable: true },
                { name: 'Start Date', selector: row => new Date(row.startDate), sortable: true, format: row => row.startDate },
                { name: 'Department', selector: row => row.department, sortable: true },
                { name: 'Date of Birth', selector: row => new Date(row.dateOfBirth), sortable: true, format: row => row.dateOfBirth },
                { name: 'Street', selector: row => row.street, sortable: true },
                { name: 'City', selector: row => row.city, sortable: true },
                { name: 'State', selector: row => row.state, sortable: true, width: '90px' },
                { name: 'Zip Code', selector: row => row.zipCode, sortable: true, width: '118px' }
            ]);
        }
    }, [windowWidth]);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

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
                    <div className="pagination-info">
                        <p>{filteredData.length} out of {employees.length} results</p>
                    </div>
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
                        // paginationTotalRows={filteredData.length}
                        theme="custom"
                    />
                </div>
            </main>
        </>
    );
};

export default ListEmployees;