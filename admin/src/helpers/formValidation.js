import alertType from '../constants/alert/alertType';

const validateOnChange = async (schema, propName, propValue) => {
  try {
    await schema[propName].validate({
      [propName]: propValue
    });

    return { [propName]: { value: propValue, isValid: true, invalidFeedback: '' } };
  } catch (err) {
    return {
      [propName]: { value: propValue, isValid: false, invalidFeedback: err.message }
    };
  }
};

const validateOnSubmit = formData => {
  const isEmpty = !Object.keys(formData).every(key => {
    const { value } = formData[key];
    return typeof value === 'boolean' ? true : value;
  });
  const isValid = Object.keys(formData).every(key =>
    hasOwnProperty.call(formData[key], 'isValid') ? formData[key].isValid : true
  );

  if (isEmpty || !isValid) {
    const type = isEmpty ? 'emptyInput' : 'invalidInput';
    return { isValid: false, alertData: alertType[type] };
  }

  return { isValid: true };
};

export default { validateOnChange, validateOnSubmit };
