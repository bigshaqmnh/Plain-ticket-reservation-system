const sortAlgorithms = {
  asc: (items, prop) => items.sort((current, next) => (current[prop] < next[prop] ? -1 : 1)),
  desc: (items, prop) => items.sort((current, next) => (current[prop] > next[prop] ? -1 : 1))
};

export default sortAlgorithms;
