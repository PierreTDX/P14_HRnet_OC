import { useEffect } from 'react';

const useEmployeeTable = () => {
  useEffect(() => {


    window.$(function() {
        const employees = JSON.parse(localStorage.getItem('employees'));

        // Vérifie si la DataTable existe déjà et la détruit si besoin
        if (window.$.fn.DataTable.isDataTable('#employee-table')) {
            window.$('#employee-table').DataTable().destroy();
        }

        window.$('#employee-table').DataTable({
            data: employees,
            columns: [
                { title: 'First Name', data: 'firstName' },
                { title: 'Last Name', data: 'lastName' },
                { title: 'Start Date', data: 'startDate' },
                { title: 'Department', data: 'department' },
                { title: 'Date of Birth', data: 'dateOfBirth' },
                { title: 'Street', data: 'street' },
                { title: 'City', data: 'city' },
                { title: 'State', data: 'state' },
                { title: 'Zip Code', data: 'zipCode' },
            ]
        });
        });
  }, []);
};

export default useEmployeeTable;