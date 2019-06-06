const getAll = async (limit = 20, pageNum = 1) => {
  const offset = pageNum * limit - limit;

  try {
    const airports = await db.airport.findAll({ offset, limit, order: [['id', 'ASC']] });
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

const searchByParam = async (param, inputString) => {
  try {
    const airports = await db.airport.findAll({
      where: {
        [param]: { [db.op.iLike]: `%${inputString}%` }
      }
    });
    return airports.map(airport => airport.dataValues);
  } catch (err) {}
};

const searchAll = async inputString => {
  try {
    const airports = await db.airport.findAll({
      where: {
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
    });
    return airports.map(airport => airport.dataValues);
  } catch (err) {}
};

const add = async airport => {
  try {
    const newAirport = await db.airport.create(airport);
    return newAirport.dataValues;
  } catch (err) {}
};

module.exports = { getAll, findById, searchByParam, searchAll, add };
