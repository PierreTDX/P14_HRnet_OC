// Fonction pure pour formater un nom (utilisable dans onSubmit)
export const formatStringName = (value) => {
    return value
        .trim()
        .replace(/\s{2,}/g, ' ')
        .toLowerCase()
        .replace(/(?:^|[\s-])\p{L}/gu, (match) => match.toUpperCase())
}

// Fonctions pour onBlur (utilise setValue)
export const formatName = (fieldName, setValue) => (e) => {
    const value = formatStringName(e.target.value)
    setValue(fieldName, value, { shouldValidate: true })
}

export const trimFieldValue = (fieldName, setValue) => (e) => {
    const value = e.target.value
        .trim() // Enlève les espaces avant et après la valeur
        .replace(/\s{2,}/g, ' '); // Remplace les espaces multiples par un seul espace
    
    setValue(fieldName, value, { shouldValidate: true });
}