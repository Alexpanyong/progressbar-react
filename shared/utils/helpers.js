// @flow

import Immutable from 'seamless-immutable';

const getObjVal = (obj: Object, keys: Array, defaultValue: string) => {
  const mappedObj = Immutable(obj);
  const res = Immutable.getIn(mappedObj, keys, defaultValue);
  return {
    isValid: !(res === undefined || res === null),
    data: res,
  };
};

const getValue = value => (value && value !== null ? value : '-');

const pxtorem = px => `${px / 16}rem`;

// eslint-disable-next-line
export { getObjVal, pxtorem, getValue };
