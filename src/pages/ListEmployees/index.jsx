import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import SelectFilter from '../../components/SelectFilter';
import SearchControls from '../../components/SearchControls';
import EmployeeTable from '../../components/EmployeeTable';
import './listEmployees.scss';

const ListEmployees = () => {
    const [search, setSearch] = useState('');
    const [departementFilter, setDepartementFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [filterStep, setFilterStep] = useState(0); // 0: rien, 1: department, 2: state

    const [showDepartmentSearch, setShowDepartmentSearch] = useState(false);
    const [showStateSearch, setShowStateSearch] = useState(false);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleToggleFilterInputs = () => {
        if (filterStep === 0) {
            setShowDepartmentSearch(true);
            setFilterStep(1);
        } else if (filterStep === 1) {
            setShowStateSearch(true);
            setFilterStep(2);
        } else {
            // Réinitialise tout
            setShowDepartmentSearch(false);
            setShowStateSearch(false);
            setDepartementFilter('');
            setStateFilter('');
            setFilterStep(0);
        }
    };

    return (
        <>
            <h1 className='pageTitle'>Current Employees</h1>
            <main>
                <div className='searchContainerAndOptions'>
                    <div className='searchContainer'>
                        <SearchBar value={search} onChange={handleSearch} />

                        {showDepartmentSearch && (
                            <SelectFilter
                                type="department"
                                value={departementFilter}
                                onChange={(e) => setDepartementFilter(e.target.value)}
                            />
                        )}

                        {showStateSearch && (
                            <SelectFilter
                                type="state"
                                value={stateFilter}
                                onChange={(e) => setStateFilter(e.target.value)}
                            />
                        )}
                    </div>

                    {(filterStep < 2 || (showDepartmentSearch && showStateSearch)) && (
                        <SearchControls
                            filterStep={filterStep}
                            handleToggle={handleToggleFilterInputs}
                        />
                    )}
                </div>

                {/* Composant EmployeeTable pour afficher les données */}
                <EmployeeTable
                    search={search}
                    departmentFilter={departementFilter}
                    stateFilter={stateFilter}
                />
            </main>
        </>
    );
};

export default ListEmployees;