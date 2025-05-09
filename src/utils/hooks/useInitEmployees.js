import { useEffect } from 'react';
import employees from '../../data/generated_users.json';

const useInitEmployees = () => {
  useEffect(() => {
    // Utiliser un délai pour initialiser les employés sans bloquer le rendu
    const initEmployees = () => {
      if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify(employees));
      }
    };

    setTimeout(initEmployees, 0); // Exécution après le rendu principal
  }, []);
};

export default useInitEmployees;