const find = async ({ page, query: inputString, limit: resLimit } = {}) => {
  const limit = resLimit || 10;
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

  const airplanes = await db.airplane.findAndCountAll({
    where: searchParam,
    offset,
    limit,
    order: [['id', 'ASC']],
    attributes: ['id', 'name', 'type', 'maxLuggageCarryWeight']
  });

  const { rows, count } = airplanes;

  if (!rows.length) {
    return;
  }

  const data = rows.map(airplane => airplane.dataValues);

  return { data, count };
};

const add = async airplane => {
  const added = await db.airplane.create(airplane);
  return added.dataValues;
};

module.exports = { find, add };
