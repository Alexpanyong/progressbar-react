// @flow
import _forEach from 'lodash/forEach';
import _reduce from 'lodash/reduce';

const getValidatorOption = (
  validator: Function,
  args: Array,
  message: string
) => ({ validator, args, message });

class CreateForm {
  formState = {};

  validatorOptions = {};

  fields = [];

  constructor(fields: Array) {
    this.formState = fields.reduce((res, field) => {
      res[field] = { value: '', error: { hasError: false, message: '' } };
      return res;
    }, {});
    this.fields = [...fields];
  }

  setFormValidatorOptions = (validateOptions: Array) => {
    this.validatorOptions = this.fields.reduce((res, field, ind) => {
      res[field] = [];
      validateOptions[ind].forEach(v => res[field].push(v));
      return res;
    }, {});
  };

  getValidatorOptions = () => ({ ...this.validatorOptions });

  resetErrors = () => {
    this.fields.forEach(f => {
      this.formState[f].error = { hasError: false, message: '' };
    });
    return { ...this.formState };
  };

  resetFields = () => {
    this.fields.forEach(f => {
      this.formState[f] = {
        value: '',
        error: { hasError: false, message: '' },
      };
    });
    return { ...this.formState };
  };

  getFormState = () => ({ ...this.formState });

  checkValidation = () => {
    const validationResult = { isValid: true, errors: {} };
    _forEach(this.validatorOptions, (value, field) => {
      const option = this.validatorOptions[field];
      const messages = option.reduce((res, curr) => {
        if (!curr.validator(...curr.args)) res.push(curr.message);
        return res;
      }, []);
      if (messages.length > 0) {
        validationResult.isValid = false;
        validationResult.errors[field] = [...messages];
      }
    });
    return validationResult;
  };

  validateFields = updatedState => {
    this.formState = { ...updatedState };
    const validObj = this.checkValidation();
    const retObj = { isValid: true, state: null };
    if (validObj.isValid) return retObj;
    const { errors } = validObj;
    const newState = { ...this.formState };
    _forEach(errors, (value, field) => {
      newState[field].error = {
        hasError: true,
        message: errors[field][0],
      };
    });
    return { isValid: false, state: newState };
  };

  getFieldsValue = () => {
    return _reduce(
      this.formState,
      (res, value, field) => {
        res[field] = this.formState[field].value;
        return res;
      },
      {}
    );
  };

  getFieldValue = field => ({ [field]: this.formState[field].value });

  setFieldValue = (state, field, value, error = false, errorMessage = '') => {
    const newState = { ...state };
    if (!error) {
      newState[field] = {
        value,
        error: {
          hasError: false,
          message: '',
        },
      };
    } else if (newState[field]) {
      newState[field].error = { hasError: true, message: errorMessage };
    }
    this.formState = { ...newState };
    return { ...this.formState };
  };

  setFieldValues = (state, data) => {
    const newState = { ...state };
    _forEach(data, (value, k) => {
      newState[k] = {
        value: data[k],
        error: {
          hasError: false,
          message: '',
        },
      };
    });
    this.formState = { ...newState };
    return { ...this.formState };
  };
}

export { CreateForm, getValidatorOption };
