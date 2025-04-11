import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable, { createTheme } from 'react-data-table-component';
import iconSearch from '../../assets/img/chercher.png'
import './listEmployees.scss';
import { states } from '../../data/states';

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
    const [columns, setColumns] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [stateFilter, setStateFilter] = useState('');
    const [departementFilter, setDepartementFilter] = useState('');

    const navigate = useNavigate();

    // Récupérer les données de la ligne du tableau pour l'envoyer à la page désignée
    const handleRowClicked = (row) => {
        navigate('/detailemployees', { state: { employee: row } });
    };

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

    // Fonction pour filtrer les données en fonction de la recherche
    const filteredData = employees.filter(item => {
        const searchTerms = search.toLowerCase().split(' ');

        const matchesSearch = searchTerms.every(term =>
            Object.values(item).some(value =>
                value.toString().toLowerCase().includes(term)
            )
        );

        const matchesState = item.state.toLowerCase().includes(stateFilter.toLowerCase());
        const matchesDep = item.department.toLowerCase().includes(departementFilter.toLowerCase());

        return matchesSearch && matchesState && matchesDep;
    });

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


    const [showDepartmentSearch, setShowDepartmentSearch] = useState(false);
    const [showStateSearch, setShowStateSearch] = useState(false);


    // Toggle pour afficher/masquer le select département
    const toggleDepartmentSearch = () => {
        setShowDepartmentSearch((prev) => !prev);
    };

    // Toggle pour afficher/masquer le select état
    const toggleStateSearch = () => {
        setShowStateSearch((prev) => !prev);
    };

    // Fonction pour masquer les deux selects avec le bouton -
    const hideBothSearches = () => {
        setShowDepartmentSearch(false);
        setShowStateSearch(false);
        setDepartementFilter('');  // Réinitialiser la valeur du département
        setStateFilter('');        // Réinitialiser la valeur de l'état
    };

    return (
        <>
            <h1 className='pageTitle'>Current Employees</h1>
            <main>
                <div className="searchContainer">
                    <div className="searchBar">
                        <div className="searchIcon">
                            <img src={iconSearch} alt="icon search" width={18} height={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search all columns"
                            value={search}
                            onChange={handleSearch}
                            className="searchInput"
                        />
                    </div>
                    {/* Affichage du + pour afficher le select de département */}
                    {!showDepartmentSearch && !showStateSearch && (
                        <div onClick={toggleDepartmentSearch} style={{ cursor: 'pointer', fontSize: '24px' }}>
                            +
                        </div>
                    )}

                    {/* Affichage conditionnel du select de recherche de département */}
                    {showDepartmentSearch && (
                        <div className="searchDepartment">
                            <select
                                name="department"
                                id="department"
                                value={departementFilter}
                                onChange={(e) => setDepartementFilter(e.target.value)}
                            >
                                <option value="">Select Department</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Legal">Legal</option>
                            </select>
                        </div>
                    )}

                    {/* Affichage du + pour afficher le select d'état, uniquement après le département */}
                    {showDepartmentSearch && !showStateSearch && (
                        <div onClick={toggleStateSearch} style={{ cursor: 'pointer', fontSize: '24px' }}>
                            +
                        </div>
                    )}

                    {/* Affichage conditionnel du select de recherche d'état */}
                    {showStateSearch && (
                        <div className="searchState">
                            <select
                                name="state"
                                id="state"
                                value={stateFilter}
                                onChange={(e) => setStateFilter(e.target.value)}
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.abbreviation} value={state.abbreviation}>
                                        {state.abbreviation} - {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Affichage du - pour cacher les deux inputs une fois qu'ils sont affichés */}
                    {showDepartmentSearch && showStateSearch && (
                        <div onClick={hideBothSearches} style={{ cursor: 'pointer', fontSize: '24px' }}>
                            -
                        </div>
                    )}
                </div>
                <DataTable
                    className='customTable'
                    columns={columns}
                    data={filteredData}
                    pagination
                    pointerOnHover
                    striped
                    ariaLabel
                    theme="custom"
                    onRowClicked={handleRowClicked}
                    persistTableHead
                />
                <div className="paginationInfo">
                    <p>{filteredData.length}/{employees.length} results</p>
                </div>
            </main >
        </>
    );
};

export default ListEmployees;