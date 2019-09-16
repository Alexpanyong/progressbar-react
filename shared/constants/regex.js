/* eslint-disable */
const RegexStrings = {
  alphanumeric: '(?=.*[0-9])(?=.*[a-zA-Z])',
  // eslint-disable-next-line
  // email: '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$',
  email:
    "^([\\w!#$%&'*+-/=?^_`{|}~]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$",
};

export default RegexStrings;
