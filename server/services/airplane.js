const CustomError = require('../classes/CustomError');
const error = require('../constants/errors');

const find = async ({ page, query: inputString, limit: resLimit } = {}) => {
  const limit = resLimit || 20;
  const pageNum = +page || 1;
  const offset = pageNum * limit - limit;
  const searchParam = inputString
    ? {
        [db.op.or]: [
          {
            name: { [db.op.iLike]: `%${inputString}%` }
          },
          {
            type: { [db.op.iLike]: `%${inputString}%` }
          }
        ]
      }
    : {};

  try {
    const airplanes = await db.airplane.findAll({
      where: searchParam,
      offset,
      limit,
      order: [['id', 'ASC']],
      attributes: ['id', 'name', 'type', 'maxLuggageCarryWeight']
    });

    return {
      data: airplanes.map(airplane => airplane.dataValues),
      nextPage: pageNum + 1
    };
  } catch (err) {
    throw new CustomError(err);
  }
};

const findById = async id => {
  try {
    const airplane = await db.airplane.findByPk(id);

    if (!airplane) {
      throw new CustomError({ status: error.notFound });
    }
    return airplane.dataValues;
  } catch (err) {
    throw new CustomError(err);
  }
};

const add = async airplane => {
  try {
    await db.airplane.create(airplane);
  } catch (err) {
    throw new CustomError({ status: error.conflict, message: err.message });
  }
};

module.exports = { find, findById, add };
