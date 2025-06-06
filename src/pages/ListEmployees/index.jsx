import React, { useState, lazy, Suspense } from 'react';
import SearchBar from '../../components/SearchBar';
import SearchControls from '../../components/SearchControls';
import EmployeeTable from '../../components/EmployeeTable';
import LoaderComponent from '../../components/Loader/lodaerComponent';
import { states } from '../../data/states'
// import { useLocalEmployees } from '../../utils/hooks/useLocalEmployees'; // avant zustand
import { useEmployeeStore } from '../../store/employeeStore';
import { useFilteredEmployees } from '../../utils/hooks/useFilteredEmployees';
import { useResetInvalidFilter } from '../../utils/hooks/useResetInvalidFilter';
import { useSearch } from '../../utils/hooks/useSearch';
import { useFilterToggle } from '../../utils/hooks/useFilterToggle';
import { buildStateMapping, createStateOptions } from '../../utils/tools/stateUtils';
import { createDepartmentOptions } from '../../utils/tools/departmentUtils';
import './listEmployees.scss';

const SelectInput = lazy(() => import('../../components/FormSections/FloatingInputs/Inputs/SelectInput'));

const ListEmployees = () => {

    // const employees = useLocalEmployees(); // avant zustand
    const employees = useEmployeeStore((state) => state.employees);
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

                        <Suspense fallback={<LoaderComponent />}>
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
                        </Suspense>
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