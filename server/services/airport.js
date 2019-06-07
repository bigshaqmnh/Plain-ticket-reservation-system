const find = async ({ page, inputString, param, resLimit } = {}) => {
  const limit = resLimit || 20;
  const pageNum = page || 1;
  const offset = pageNum * limit - limit;
  let searchParam = {};

  if (param && inputString) {
    searchParam = {
      [param]: { [db.op.iLike]: `%${inputString}%` }
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

  try {
    const airports = await db.airport.findAll({
      where: searchParam,
      offset,
      limit,
      order: [['id', 'ASC']]
    });

    return {
      data: airports.map(airport => airport.dataValues),
      nextPage: ++pageNum
    };
  } catch (err) {}
};

const findById = async id => {
  try {
    const airport = await db.airport.findByPk(id);
    return airport.dataValues;
  } catch (err) {}
};

const add = async airport => {
  try {
    const newAirport = await db.airport.create(airport);
    return newAirport.dataValues;
  } catch (err) {}
};

module.exports = { find, findById, add };
