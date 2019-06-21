const CustomError = require('../classes/CustomError');
const error = require('../constants/error');

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
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
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
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }

    const { dataValues, luggageType, luggageSize } = luggageOption;
    return {
      luggageOption: dataValues,
      luggageType: luggageType.dataValues,
      luggageSize: luggageSize.dataValues
    };
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
  }
};

module.exports = { find, findById };
