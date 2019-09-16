// @flow

export default (value: string, pattern: string) => {
  const regex = new RegExp(pattern);
  regex.lastIndex = 0;
  return regex.test(value);
};
