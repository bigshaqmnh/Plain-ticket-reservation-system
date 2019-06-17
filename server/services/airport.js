const CustomError = require('../classes/CustomError');
const error = require('../constants/errors');

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

  try {
    const airports = await db.airport.findAll({
      where: searchParam,
      offset,
      limit,
      order: [['id', 'ASC']],
      attributes: ['id', 'name', 'country', 'city', 'latitude', 'longitude']
    });

    return {
      data: airports.map(airport => airport.dataValues),
      nextPage: pageNum + 1
    };
  } catch (err) {
    throw new CustomError(err);
  }
};

const findById = async id => {
  try {
    const airport = await db.airport.findByPk(id);

    if (!airport) {
      throw new CustomError({ status: error.notFound });
    }
    return airport.dataValues;
  } catch (err) {
    throw new CustomError(err);
  }
};

const add = async airport => {
  try {
    await db.airport.create(airport);
  } catch (err) {
    throw new CustomError({ status: error.conflict, message: err.message });
  }
};

module.exports = { find, findById, add };
