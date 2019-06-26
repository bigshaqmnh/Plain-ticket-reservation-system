const find = async ({ page, query: inputString, field, limit: resLimit } = {}) => {
  const limit = resLimit || 20;
  const pageNum = +page || 1;
  const offset = pageNum * limit - limit;
  let searchParam = {};

  if (field && inputString) {
    searchParam = {
      [field]: { [db.op.iLike]: `%${inputString}%` }
    };
  } else if (inputString) {
    searchParam = {
      [db.op.or]: [
        {
          name: { [db.op.iLike]: `%${inputString}%` }
        },
        {
          country: { [db.op.iLike]: `%${inputString}%` }
        },
        {
          city: { [db.op.iLike]: `%${inputString}%` }
        }
      ]
    };
  }

  const airports = await db.airport.findAll({
    where: searchParam,
    offset,
    limit,
    order: [['id', 'ASC']],
    attributes: ['id', 'name', 'country', 'city', 'latitude', 'longitude']
  });

  if (!airports.length) return;

  const data = airports.map(airport => airport.dataValues);

  return airports.length > resLimit
    ? {
        data,
        nextPage: pageNum + 1
      }
    : { data };
};

const add = async airport => await db.airport.create(airport);

module.exports = { find, add };
