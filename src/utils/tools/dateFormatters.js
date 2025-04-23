export const formatToMMDDYYYY = (dateObj) => {
    if (!dateObj || isNaN(new Date(dateObj))) return '';
    const date = new Date(dateObj);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };  