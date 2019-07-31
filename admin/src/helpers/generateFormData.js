export default (dataScheme, data = null) => {
  const formData = {};
  const keys = Object.keys(dataScheme);

  keys.forEach(
    key =>
      (formData[key] = {
        value: (data && data[key]) || dataScheme[key],
        isValid: true,
        invalidFeedback: ''
      })
  );

  return formData;
};
