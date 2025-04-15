export function useCreateEmployee() {

  const saveEmployee = (data) => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.unshift(data); // Ajoute au début
    localStorage.setItem('employees', JSON.stringify(employees));

    // Affiche la modale
    window.$('#confirmation').modal();
  };

  return { saveEmployee };
}