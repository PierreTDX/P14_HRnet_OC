export const validateBirthDate = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
  
    // Vérifie que la date n'est pas dans le futur
    if (selectedDate > today) {
      return "* Birth date cannot be in the future";
    }
  
    // Calcule la date limite (100 ans avant aujourd'hui)
    const maxAgeDate = new Date(today.setFullYear(today.getFullYear() - 100));
  
    // Vérifie que l'utilisateur n'a pas plus de 100 ans
    if (selectedDate < maxAgeDate) {
      return "* cannot be older than 100 years";
    }
  
    return true;
  };  