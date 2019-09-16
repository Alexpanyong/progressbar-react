/* eslint-disable import/prefer-default-export */
/* eslint-disable max-len */
import moment from 'moment';

const default_datetime_format = 'YYYY-MM-DD HH:mm:ss';
const default_date = 'YYYY-MM-DD';
// const default_time = 'HH:mm:ss';

export const formatDate = (
  inputDateString,
  inputDateFormat = default_datetime_format, // The format the original date from backend is in
  format = undefined // For special case in case a different format is needed
) => {
  return moment(inputDateString, inputDateFormat).format(
    format || default_datetime_format
  );
};

export const formatDateOnly = (
  inputDateString,
  inputDateFormat = default_date, // The format the original date from backend is in
  format = undefined // For special case in case a different format is needed
) => {
  return moment(inputDateString, inputDateFormat).format(
    format || default_date
  );
};
