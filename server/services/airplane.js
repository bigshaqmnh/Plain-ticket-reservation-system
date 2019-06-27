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

  const airplanes = await db.airplane.findAll({
    where: searchParam,
    offset,
    limit,
    order: [['id', 'ASC']],
    attributes: ['id', 'name', 'type', 'maxLuggageCarryWeight']
  });

  if (!airplanes.length) {
    return;
  }

  const data = airplanes.map(airplane => airplane.dataValues);

  return airplanes.length > resLimit
    ? {
        data,
        nextPage: pageNum + 1
      }
    : { data };
};

const add = async airplane => await db.airplane.create(airplane);

module.exports = { find, add };
