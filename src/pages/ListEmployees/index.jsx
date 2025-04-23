import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import SelectInput from '../../components/SelectInput';
import SearchControls from '../../components/SearchControls';
import EmployeeTable from '../../components/EmployeeTable';
import { states } from '../../data/states'
import { useLocalEmployees } from '../../utils/hooks/useLocalEmployees';
import { useFilteredEmployees } from '../../utils/hooks/useFilteredEmployees';
import { useResetInvalidFilter } from '../../utils/hooks/useResetInvalidFilter';
import { useSearch } from '../../utils/hooks/useSearch';
import { useFilterToggle } from '../../utils/hooks/useFilterToggle';
import { buildStateMapping, createStateOptions } from '../../utils/tools/stateUtils';
import { createDepartmentOptions } from '../../utils/tools/departmentUtils';
import './listEmployees.scss';

const ListEmployees = () => {

    const employees = useLocalEmployees();
    const { search, handleSearch, handleClearSearch } = useSearch();
    const [departementFilter, setDepartementFilter] = useState('');
    const [stateFilter, setStateFilter] = useState('');

    // gestion de l'affichage des filtres
    const {
        filterStep,
        showDepartmentSearch,
        showStateSearch,
        handleToggleFilterInputs
    } = useFilterToggle(setDepartementFilter, setStateFilter);

    // gestion des filtres
    const { filteredByDepartment, filteredByState } = useFilteredEmployees(employees, search, departementFilter, stateFilter);

    // Liste des départements disponibles selon le filtre état
    const departmentOptions = createDepartmentOptions(filteredByState);

    // Liste des états disponibles selon le filtre département
    const stateMapping = buildStateMapping(states);
    const stateOptions = createStateOptions(filteredByDepartment, stateMapping);

    // réinitialiser les filtres si pas de correspondances à la recherche
    useResetInvalidFilter(departementFilter, departmentOptions, setDepartementFilter);
    useResetInvalidFilter(stateFilter, stateOptions, setStateFilter);


    return (
        <>
            <h1 className='pageTitle'>Current Employees</h1>
            <main>
                <div className='searchContainerAndOptions'>
                    <div className='searchContainer'>
                        <SearchBar value={search} onChange={handleSearch} onClear={handleClearSearch} />

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
                    employees={employees}
                    search={search}
                    departmentFilter={departementFilter}
                    stateFilter={stateFilter}
                />
            </main>
        </>
    );
};

export default ListEmployees;