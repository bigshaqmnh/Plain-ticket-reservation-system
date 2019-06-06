const getAll = async ({ page, inputString, param, resLimit } = {}) => {
  const limit = resLimit || 20;
  const pageNum = page || 1;
  const offset = pageNum * limit - limit;
  const searchParam =
    param && inputString
      ? {
          [param]: { [db.op.iLike]: `%${inputString}%` }
        }
      : inputString
      ? {
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
        }
      : {};

  try {
    const airports = await db.airport
      .findAll({
        where: searchParam,
        offset,
        limit,
        order: [['id', 'ASC']]
      })
      .then(data => console.log('FOUND: ', data))
      .catch(err => console.error('ERROR: ', err));

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

module.exports = { getAll, findById, add };
