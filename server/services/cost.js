const findByFlightId = async flightId => {
  try {
    const cost = await db.cost.findOne({
      where: { flightId },
      attributes: ['id', 'cost', 'seatTypeId', 'luggageOptionId']
    });
    return cost.dataValues;
  } catch (err) {
    throw new Error(err);
  }
};

const findMinCostByFlightId = async flightId => {
  try {
    const minCost = await db.cost.min('cost', {
      where: { flightId }
    });
    return minCost;
  } catch (err) {
    throw new Error(err);
  }
};

const findById = async id => {
  try {
    const cost = await db.cost.findOne({
      where: { id },
      include: [{ model: db.luggageOption, attributes: ['id', 'name'] }],
      attributes: ['id', 'cost', 'flightId']
    });
    const { dataValues, luggageOption } = cost;
    return {
      cost: dataValues,
      luggageOption: luggageOption.dataValues
    };
  } catch (err) {
    throw new Error(err);
  }
};

const add = async cost => {
  try {
    await db.cost.create(cost);
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (id, cost) => {
  try {
    await db.cost.update(cost, { where: { id } });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { findByFlightId, findMinCostByFlightId, findById, add, update };
