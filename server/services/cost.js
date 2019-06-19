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

const findByIds = async ids => {
  try {
    const costs = await db.cost.findAll({
      where: { id: { [db.op.in]: ids } },
      include: [{ model: db.luggageOption, attributes: ['id', 'name'] }],
      attributes: ['id', 'cost', 'flightId']
    });

    if (!costs) {
      throw new CustomError({ status: responseStatus.notFound });
    }
    return costs.map(cost => ({ ...cost.dataValues, luggageOption: cost.luggageOption.dataValues }));
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

module.exports = { findByFlightId, findMinCostByFlightId, findByIds, add, update };
