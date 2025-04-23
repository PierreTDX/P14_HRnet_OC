export const normalizeString = (str) => {
    return (str || '')
        .toString()
        .normalize("NFD")                // décompose les lettres accentuées
        .replace(/[\u0300-\u036f]/g, "") // supprime les accents
        .toLowerCase()                  // convertit en minuscules
        .trim();                        // supprime les espaces en début/fin
}