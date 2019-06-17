const CustomError = require('../classes/CustomError');
const error = require('../constants/errors');

const find = async () => {
  try {
    const luggageOptions = await db.luggageOption.findAll({
      include: [
        { model: db.luggageType, attributes: ['name'] },
        { model: db.luggageSize, attributes: ['dimensions', 'maxWeight'] }
      ]
    });

    return luggageOptions.map(luggageOption => luggageOption.dataValues);
  } catch (err) {
    throw new CustomError(err);
  }
};

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

    if (!luggageOption) {
      throw new CustomError({ status: error.notFound });
    }

    const { dataValues, luggageType, luggageSize } = luggageOption;
    return {
      luggageOption: dataValues,
      luggageType: luggageType.dataValues,
      luggageSize: luggageSize.dataValues
    };
  } catch (err) {
    throw new CustomError(err);
  }
};

module.exports = { find, findById };
