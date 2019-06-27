const find = async () => {
  const luggageOptions = await db.luggageOption.findAll({
    include: [
      { model: db.luggageType, attributes: ['name'] },
      { model: db.luggageSize, attributes: ['dimensions', 'maxWeight'] }
    ]
  });

  if (!luggageOptions.length) {
    return;
  }

  return luggageOptions.map(luggageOption => luggageOption.dataValues);
};

const findById = async id => {
  const luggageOption = await db.luggageOption.findOne({
    where: { id },
    include: [
      { model: db.luggageType, attributes: ['name'] },
      { model: db.luggageSize, attributes: ['dimensions', 'maxWeight'] }
    ],
    attributes: ['name']
  });

  if (!luggageOption) {
    return;
  }

  return {
    ...luggageOption.dataValues,
    luggageType: luggageOption.luggageType.dataValues,
    luggageSize: luggageOption.luggageSize.dataValues
  };
};

module.exports = { find, findById };
