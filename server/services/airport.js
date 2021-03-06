const find = async ({ page, query: inputString, field, limit: resLimit } = {}) => {
  const limit = resLimit || 10;
  const pageNum = +page || 1;
  const offset = pageNum * limit - limit;
  let searchParam = {};
  const attributes = field ? ['id', field] : ['id', 'name', 'country', 'city'];

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

  const airports = await db.airport.findAndCountAll({
    where: searchParam,
    offset,
    limit,
    order: [['id', 'ASC']],
    attributes
  });

  const { rows, count } = airports;

  if (!rows.length) {
    return;
  }

  const data = rows.map(airport => airport.dataValues);

  return { data, count };
};

const findById = async airportId => {
  const airport = await db.airport.findOne({
    where: { id: airportId },
    attributes: ['id', 'name', 'city', 'country', 'latitude', 'longitude']
  });

  return airport.dataValues;
};

const add = async airport => {
  const added = await db.airport.create(airport);
  return added.dataValues;
};

module.exports = { find, findById, add };
