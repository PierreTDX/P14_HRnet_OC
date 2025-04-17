import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import SelectInput from '../../components/SelectInput';
import SearchControls from '../../components/SearchControls';
import EmployeeTable from '../../components/EmployeeTable';
import { states } from '../../data/states'
import { departments } from '../../data/departements'
import './listEmployees.scss';

const ListEmployees = () => {
    const [search, setSearch] = useState('');
    const [departementFilter, setDepartementFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [filterStep, setFilterStep] = useState(0); // 0: rien, 1: department, 2: state


    const [showDepartmentSearch, setShowDepartmentSearch] = useState(false);
    const [showStateSearch, setShowStateSearch] = useState(false);

    // Définir les options pour l'état
    const stateOptions = states.map(state => ({
        value: state.abbreviation,
        label: state.name,
    }));

    // Définir les options pour department
    const departmentOptions = departments.map(dep => ({
        value: dep.name,
        label: dep.name,
    }));

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
                            <SelectInput
                                name="department"
                                options={departmentOptions}
                                placeholder="Select a department"
                                value={departementFilter}
                                onChange={(val) => setDepartementFilter(val)}
                            />
                        )}

                        {showStateSearch && (
                            <SelectInput
                                name="state"
                                options={stateOptions}
                                placeholder="Select a state"
                                value={stateFilter}
                                onChange={(val) => setStateFilter(val)}
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