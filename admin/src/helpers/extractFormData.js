const extractFormData = formData => {
  const data = {};

  Object.keys(formData).forEach(key => (data[key] = formData[key].value));

  return data;
};

export default extractFormData;
