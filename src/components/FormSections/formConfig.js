import { validateGenericName } from '../../utils/validators/nameValidador';
import { validateBirthDate } from '../../utils/validators/birthDateValidator';
import { validateZipCode } from '../../utils/validators/zipCodeValidator';
import { validateStreet } from '../../utils/validators/streetValidator';
import { validateStartDate } from '../../utils/validators/startDateValidator';

export const getRegisterOptions = (dateOfBirth) => ({
  firstName: {
    required: '* First name is required',
    validate: validateGenericName,
  },
  lastName: {
    required: '* Last name is required',
    validate: validateGenericName,
  },
  dateOfBirth: {
    required: '* Birth date is required',
    validate: validateBirthDate,
  },
  zipCode: {
    required: '* Zip code is required',
    validate: validateZipCode,
  },
  department: {
    required: '* Department is required',
  },
  street: {
    required: '* Street is required',
    validate: validateStreet,
  },
  city: {
    required: '* City is required',
    validate: validateGenericName,
  },
  state: {
    required: '* State is required',
  },
  startDate: {
    required: '* Start date is required',
    validate: (value) => validateStartDate(value, dateOfBirth),
  },
});
