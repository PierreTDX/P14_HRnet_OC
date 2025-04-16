export const validateStreet = (value) => {
    const street = value.trim();

    // Refuser les balises HTML
    if (/<[^>]*>/g.test(street)) {
        return "* HTML tags are not allowed";
    }

    // Autoriser lettres, chiffres, espace, ponctuation standard
    const pattern = /^[\p{L}0-9\s.,'#-]+$/u;
    if (!pattern.test(street)) {
        return "* invalid characters in street address";
    }

    return true;
};