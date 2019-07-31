const find = async ({ page, query: inputString, field, limit: resLimit } = {}) => {
  const limit = resLimit || 10;
  const pageNum = +page || 1;
  const offset = pageNum * limit - limit;
  let searchParam = {};
  const attributes = field ? ['id', field] : ['id', 'name', 'type', 'maxLuggageCarryWeight'];

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
          type: { [db.op.iLike]: `%${inputString}%` }
        }
      ]
    };
  }

  const airplanes = await db.airplane.findAndCountAll({
    where: searchParam,
    offset,
    limit,
    order: [['id', 'ASC']],
    attributes
  });

  const { rows, count } = airplanes;

  if (!rows.length) {
    return;
  }

  const data = rows.map(airplane => airplane.dataValues);

  return { data, count };
};

const findById = async airplaneId => {
  const airplane = await db.airplane.findOne({
    where: { id: airplaneId },
    attributes: ['id', 'name', 'type', 'maxLuggageCarryWeight']
  });

  return airplane.dataValues;
};

const add = async airplane => {
  const added = await db.airplane.create(airplane);
  return added.dataValues;
};

module.exports = { find, findById, add };
