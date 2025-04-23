import { formatStringName } from '../tools/sanitizeTrimmedInput';
import { formatToMMDDYYYY } from './dateFormatters';

export const formatEmployeeData = (data) => ({
  ...data,
  firstName: formatStringName(data.firstName),
  lastName: formatStringName(data.lastName),
  street: formatStringName(data.street),
  city: formatStringName(data.city),
  zipCode: data.zipCode.trim(),
  dateOfBirth: formatToMMDDYYYY(data.dateOfBirth),
  startDate: formatToMMDDYYYY(data.startDate),
});