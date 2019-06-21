const CustomError = require('../classes/CustomError');
const error = require('../constants/error');

const findByFlightId = async flightId => {
  try {
    const cost = await db.cost.findOne({
      where: { flightId },
      attributes: ['id', 'cost', 'seatTypeId', 'luggageOptionId']
    });

    if (!cost) {
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }
    return cost.dataValues;
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
  }
};

const findMinCostByFlightId = async flightId => {
  try {
    const minCost = await db.cost.min('cost', {
      where: { flightId }
    });

    if (!minCost) {
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }
    return minCost;
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
  }
};

const findByIds = async ids => {
  try {
    const costs = await db.cost.findAll({
      where: { id: { [db.op.in]: ids } },
      include: [{ model: db.luggageOption, attributes: ['id', 'name'] }],
      attributes: ['id', 'cost', 'flightId']
    });

    if (!costs) {
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }
    return costs.map(cost => ({ ...cost.dataValues, luggageOption: cost.luggageOption.dataValues }));
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_FIND_DATA });
  }
};

const add = async cost => {
  try {
    await db.cost.create(cost);
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_ADD_DATA });
  }
};

const update = async (id, cost) => {
  try {
    const updated = await db.cost.update(cost, { where: { id } });

    if (!updated[0]) {
      throw new CustomError({ ...err, type: error.NO_DATA_WAS_FOUND });
    }
  } catch (err) {
    throw new CustomError({ ...err, type: error.FAILED_TO_UPDATE_DATA });
  }
};

module.exports = { findByFlightId, findMinCostByFlightId, findByIds, add, update };
