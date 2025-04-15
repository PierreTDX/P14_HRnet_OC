export const validateZipCode = (value) => {
    const zipCode = value.trim();

    // Format valide : 12345 ou 12345-1234
    const isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipCode);

    if (!isValid) {
        return "* Not valid, format must be 12345 or 12345-1234";
    }

    return true;
};