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
    const airplanes = await db.airplane.findAndCountAll({
      where: searchParam,
      offset,
      limit,
      attributes: ['id', 'name', 'type', 'maxLuggageCarryWeight'],
      order: [['id', 'ASC']]
    });

    return {
      data: airplanes.rows.map(airplane => airplane.dataValues),
      count: airplanes.count,
      nextPage: pageNum + 1
    };
  } catch (err) {
    throw new Error(err);
  }
};

const findById = async id => {
  try {
    const airplane = await db.airplane.findByPk(id);
    return airplane && airplane.dataValues;
  } catch (err) {
    throw new Error(err);
  }
};

const add = async airplane => {
  try {
    await db.airplane.create(airplane);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { find, findById, add };
