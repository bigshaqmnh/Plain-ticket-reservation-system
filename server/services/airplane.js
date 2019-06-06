const getFromPage = async pageNum => {
  const { RESULTS_PER_PAGE: limit } = process.env;
  const offset = pageNum * limit - limit;

  try {
    const airplanes = await db.airplane.findAll({ offset, limit, order: [['id', 'ASC']] });
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

const search = async inputString => {
  try {
    const airplanes = await db.airplane.findAll({
      where: {
        name: { [db.op.iLike]: `%${inputString}%` }
      }
    });
    return airplanes.map(airplane => airplane.dataValues);
  } catch (err) {}
};

const add = async airplane => {
  try {
    const newAirplane = await db.airplane.create(airplane);
    return newAirplane.dataValues;
  } catch (err) {}
};

module.exports = { getFromPage, findById, search, add };
