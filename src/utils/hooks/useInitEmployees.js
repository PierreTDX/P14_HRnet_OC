import { useEffect } from 'react';
import { useEmployeeStore } from '../../store/employeeStore';

const useInitEmployees = () => {
  const initEmployees = useEmployeeStore((state) => state.initEmployees);

  useEffect(() => {
    setTimeout(() => {
      initEmployees();
    }, 0); // Exécution après le rendu principal
  }, [initEmployees]);
};

export default useInitEmployees;