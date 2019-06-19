const sortTypes = {
  number: [
    (items, prop) => items.sort((current, next) => current[prop] - next[prop]),
    (items, prop) => items.sort((current, next) => next[prop] - current[prop])
  ],
  string: [
    (items, prop) => items.sort((current, next) => (current[prop] < next[prop] ? -1 : 1)),
    (items, prop) => items.sort((current, next) => (current[prop] > next[prop] ? -1 : 1))
  ]
};

export default sortTypes;
