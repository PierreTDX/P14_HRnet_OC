import { useEffect, useState } from 'react';

export const useFormIsEmpty = (formValues) => {
  const [isFormEmpty, setIsFormEmpty] = useState(true);

  useEffect(() => {
    const isEmpty = !Object.values(formValues).some(value => {
      if (typeof value === 'string') return value.trim() !== '';
      if (typeof value === 'object' && value !== null) return Object.keys(value).length > 0;
      return !!value;
    });

    // Ajout d'une vérification pour les dates
    const hasDates = formValues.dateOfBirth || formValues.startDate;

    // Si le formulaire est vide ou que seules les dates sont présentes, afficher Clear
    setIsFormEmpty(isEmpty && !hasDates);

  }, [formValues]); // Recalcule isFormEmpty chaque fois que formValues change

  return isFormEmpty;
};