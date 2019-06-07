const find = async ({ page, inputString, resLimit } = {}) => {
  const limit = resLimit || 20;
  const pageNum = page || 1;
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
      order: [['id', 'ASC']]
    });

    return {
      data: airplanes.map(airplane => airplane.dataValues),
      nextPage: ++pageNum
    };
  } catch (err) {}
};

const findById = async id => {
  try {
    const airplane = await db.airplane.findByPk(id);
    return airplane.dataValues;
  } catch (err) {}
};

const add = async airplane => {
  try {
    const newAirplane = await db.airplane.create(airplane);
    return newAirplane.dataValues;
  } catch (err) {}
};

module.exports = { find, findById, add };
