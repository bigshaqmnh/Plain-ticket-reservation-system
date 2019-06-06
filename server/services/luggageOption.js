const findById = async id => {
  try {
    const luggageOption = await db.luggageOption.findOne({
      where: { id },
      include: [
        { model: db.luggageType, attributes: ['name'] },
        { model: db.luggageSize, attributes: ['dimensions', 'maxWeight'] }
      ],
      attributes: ['name']
    });
    const { dataValues, luggageType, luggageSize } = luggageOption;
    return {
      luggageOption: dataValues,
      luggageType: luggageType.dataValues,
      luggageSize: luggageSize.dataValues
    };
  } catch (err) {}
};

module.exports = { findById };
