import React, { useState, useEffect } from 'react';
import _forEach from 'lodash/forEach';
import config from '@root/config';
import translationObj from './translation-file.json';

/**
 * Singleton
 */

class I18 {
  constructor() {
    if (I18.instance) return I18.instance;
    I18.instance = this;
  }

  setData = data => {
    this.data = JSON.parse(JSON.stringify(data));
  };

  getData = (key, obj, isHTML) => {
    if (!this.data) return '';
    const value = this.data[key];
    if (value) {
      if (obj !== null) {
        return this.replaceVariables(value, obj, isHTML);
      }
      return value;
    }
    return '';
  };

  replaceVariables = (value, obj, isHTML) => {
    let valueNew = value;
    _forEach(obj, (v, k) => {
      const regex = new RegExp(`{${k}}`);
      valueNew = valueNew.replace(regex, obj[k]);
    });
    return isHTML ? (
      <span dangerouslySetInnerHTML={{ __html: valueNew }} />
    ) : (
      valueNew
    );
  };
}

/**
 * Translate function
 */

export const translate = (key, obj = null, isHTML = false) => {
  const transObj = new I18();
  return transObj.getData(key, obj, isHTML);
};

/**
 * Initial Wrapper
 */

const TranslationWrapper = props => {
  const [stateLoading, setStateLoading] = useState(true);

  const setData = data => {
    // Send to singleton
    const obj = new I18();
    obj.setData(data);
    setStateLoading(false);
  };

  const replaceCopy = beTrans => {
    _forEach(translationObj, (v, k) => {
      if (beTrans[k]) {
        translationObj[k] = beTrans[k];
      } else {
        // Can add to missing key list
      }
    });
    setData(translationObj);
  };

  const getTranslation = () => {
    const { translationEndpoint } = props;
    if (translationEndpoint && translationEndpoint !== '') {
      translationEndpoint
        .all(localStorage.getItem(config.LOCALE_LOCAL_STORAGE) || 'en')
        .then(results => replaceCopy(results.data.data));
    } else {
      setData(translationObj);
    }
  };

  useEffect(() => getTranslation(), []);

  return !stateLoading ? props.children : '';
};

export default TranslationWrapper;
