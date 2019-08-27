export default (str: string) => {
  const splitLocation = str.split(', ');

  return {
    country: splitLocation[0],
    city: splitLocation[1]
  };
};
