import { useEffect } from 'react';
import { states } from '../data/states';

export function useCreateEmployee() {

  useEffect(() => {

    // On attend que le DOM soit prêt avant d'utiliser jQuery UI
    window.$(() => {
        const stateSelect = document.getElementById('state');
        states.forEach(function(state) {
            const option = document.createElement('option');
            option.value = state.abbreviation;
            option.text = state.name;
            stateSelect.appendChild(option);
        });
    
        window.$( "#department" ).selectmenu();
        window.$( "#state" ).selectmenu();
    
        window.$('#date-of-birth').datetimepicker({
            timepicker: false,
            format: 'm/d/Y'
        });
        window.$('#start-date').datetimepicker({
            timepicker: false,
            format: 'm/d/Y'
        });
    });
  }, []); // Le tableau vide assure que ce code ne s'exécute qu'une seule fois, après le premier rendu

  const saveEmployee = (e) => {
    e.preventDefault();

    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const dateOfBirth = document.getElementById('date-of-birth');
    const startDate = document.getElementById('start-date');
    const department = document.getElementById('department');
    const street = document.getElementById('street');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const zipCode = document.getElementById('zip-code');

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: dateOfBirth.value,
        startDate: startDate.value,
        department: department.value,
        street: street.value,
        city: city.value,
        state: state.value,
        zipCode: zipCode.value
    };
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));

    // Affiche la modale
    window.$('#confirmation').modal();
  };

  return { saveEmployee };
}