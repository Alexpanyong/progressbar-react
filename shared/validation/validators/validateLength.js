export default (value, min, max) => {
  if (!value) return false;
  const length = value.length; // eslint-disable-line prefer-destructuring
  let valid = true;
  if (min) valid = length >= min;
  if (max) valid = length <= max;
  if (min && max) valid = length >= min && length <= max;
  return valid;
};
