/**
 * Valide que la date de début (startDate) est au moins 12 ans après la date de naissance.
 * 
 * @param {string} startDate - La date de début (au format YYYY-MM-DD)
 * @param {string} birthDate - La date de naissance (au format YYYY-MM-DD)
 * @returns {true|string} - Retourne true si la date est valide, sinon un message d'erreur
 */
export function validateStartDate(startDate, birthDate) {
    // Si la date de naissance est absente ou invalide, on considère le champ comme valide (aucune erreur à ce stade)
    if (!birthDate || isNaN(new Date(birthDate).getTime())) return true;

    // Convertit les deux dates en objets Date
    const start = new Date(startDate);
    const birth = new Date(birthDate);

    // Ajoute 12 ans à la date de naissance pour calculer la date minimale valide
    birth.setFullYear(birth.getFullYear() + 12);

    // Si la date de début est invalide, ne retourne pas d'erreur à ce stade non plus
    if (isNaN(start.getTime())) return true;

    // Vérifie que la date de début est au moins 12 ans après la date de naissance
    // Si ce n'est pas le cas, retourne un message d'erreur
    return start >= birth || "* must be at least 12 years after birth date";
}