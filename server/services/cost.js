const CustomError = require('../classes/CustomError');
const responseStatus = require('../constants/responseStatus');

const findByFlightId = async flightId => {
  try {
    const cost = await db.cost.findOne({
      where: { flightId },
      attributes: ['id', 'cost', 'seatTypeId', 'luggageOptionId']
    });

    if (!cost) {
      throw new CustomError({ status: responseStatus.notFound });
    }
    return cost.dataValues;
  } catch (err) {
    throw new CustomError(err);
  }
};

const findMinCostByFlightId = async flightId => {
  try {
    const minCost = await db.cost.min('cost', {
      where: { flightId }
    });

    if (!minCost) {
      throw new CustomError({ status: responseStatus.notFound });
    }
    return minCost;
  } catch (err) {
    throw new CustomError(err);
  }
};

const findById = async id => {
  try {
    const cost = await db.cost.findOne({
      where: { id },
      include: [{ model: db.luggageOption, attributes: ['id', 'name'] }],
      attributes: ['id', 'cost', 'flightId']
    });

    if (!cost) {
      throw new CustomError({ status: responseStatus.notFound });
    }

    const { dataValues, luggageOption } = cost;
    return {
      cost: dataValues,
      luggageOption: luggageOption.dataValues
    };
  } catch (err) {
    throw new CustomError(err);
  }
};

const add = async cost => {
  try {
    await db.cost.create(cost);
  } catch (err) {
    throw new CustomError({ status: responseStatus.conflict, message: err.message });
  }
};

const update = async (id, cost) => {
  try {
    const updated = await db.cost.update(cost, { where: { id } });

    if (!updated[0]) {
      throw new CustomError({ status: responseStatus.notFound });
    }
  } catch (err) {
    throw new CustomError({ status: responseStatus.conflict, message: err.message });
  }
};

module.exports = { findByFlightId, findMinCostByFlightId, findById, add, update };
