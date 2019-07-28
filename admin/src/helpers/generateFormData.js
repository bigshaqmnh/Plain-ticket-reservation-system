export default (dataScheme, data = null) => {
  const formData = {};

  dataScheme.forEach(
    key =>
      (formData[key] = {
        value: data ? data[key] : dataScheme[key],
        isValid: true,
        invalidFeedback: ''
      })
  );

  return formData;
};
