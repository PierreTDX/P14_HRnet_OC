// Critères de validation
export const validateGenericName = (value) => {
    const trimmed = value.trim();

    // 1. Vérifie si la chaîne est vide ou composée uniquement d'espaces
    if (/^\s*$/.test(value)) {
        return `* cannot be only spaces`;
    }

    // 2. Accepte uniquement les lettres (accents inclus), tirets, apostrophes et espaces
    if (!/^[a-zA-ZÀ-ÿ-' ]+$/.test(trimmed)) {
        return `* should only contain letters, hyphens, apostrophes, or spaces`;
    }

    // 3. Ne pas commencer par - ou '
    if (/^[-']/.test(trimmed)) {
        return `* cannot begin with - or '` ;
    }

    // 4. Ne pas finir par - ou '
    if (/[-']$/.test(trimmed)) {
        return `* cannot end with - or '` ;
    }

    // 5. Interdire les doubles apostrophes
    if (/''/.test(trimmed)) {
        return `* cannot contain double apostrophes` ;
    }

    // 6. Interdire plus de deux tirets consécutifs
    if (/---+/.test(trimmed)) {
        return `* cannot contain more than two hyphens in a row` ;
    }

    return true;
};

    // pattern : autorise espace en début et fin de mot mais pas les ' et -, accepte le double -- et ' et - et espace en milieu de mot
    // const namesPattern = /^(?!\s*$)(?!.*''.*)[a-zA-Z ]+([-' ]{1,2}[a-zA-Z ]+)*$/;