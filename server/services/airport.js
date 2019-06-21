const CustomError = require('../classes/CustomError');
const error = require('../constants/error');

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
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
  }
};

const add = async airport => {
  try {
    await db.airport.create(airport);
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_ADD_DATA });
  }
};

module.exports = { find, add };
