import { sortByFieldIgnoreAccent } from "./sortFunctions";

export const getColumnsForWidth = (width) => {
  const baseColumns = [
    {
      name: 'First Name',
      selector: row => row.firstName,
      sortable: true,
      sortFunction: sortByFieldIgnoreAccent('firstName'),
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      sortable: true,
      sortFunction: sortByFieldIgnoreAccent('lastName'),
    },
  ];

  if (width <= 425) return baseColumns;

  const extendedColumns = [
    ...baseColumns,
    {
      name: 'Start Date',
      selector: row => row.startDate,
      sortable: true,
      sortFunction: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    },
    {
      name: 'Department',
      selector: row => row.department,
      sortable: true,
      sortFunction: sortByFieldIgnoreAccent('department'),
    },
  ];

  if (width <= 768) return extendedColumns;

  if (width <= 1024) {
    return [
      ...extendedColumns,
      { name: 'Street', selector: row => row.street, sortable: true, sortFunction: sortByFieldIgnoreAccent('street') },
      { name: 'City', selector: row => row.city, sortable: true, sortFunction: sortByFieldIgnoreAccent('city') },
    ];
  }

  return [
    ...extendedColumns,
    { name: 'Date of Birth', selector: row => row.dateOfBirth, sortable: true, sortFunction: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth) },
    { name: 'Street', selector: row => row.street, sortable: true, sortFunction: sortByFieldIgnoreAccent('street') },
    { name: 'City', selector: row => row.city, sortable: true, sortFunction: sortByFieldIgnoreAccent('city') },
    { name: 'State', selector: row => row.state, sortable: true, width: '90px', sortFunction: sortByFieldIgnoreAccent('state') },
    { name: 'Zip Code', selector: row => row.zipCode, sortable: true, width: '118px' },
  ];
};