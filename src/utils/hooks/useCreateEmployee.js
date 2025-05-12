// Pas utilisé avec zustand
export function useCreateEmployee() {

  const saveEmployee = (data) => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.unshift(data); // Ajoute au début
    localStorage.setItem('employees', JSON.stringify(employees));
  };

  return { saveEmployee };
}