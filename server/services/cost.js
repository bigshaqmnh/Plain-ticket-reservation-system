const findByFlightId = async flightId => {
  try {
    const cost = await db.cost.findOne({
      where: { flightId },
      attributes: ['id', 'cost', 'seatTypeId', 'luggageOptionId']
    });
    return cost.dataValues;
  } catch (err) {}
};

const findMinCostByFlightId = async flightId => {
  try {
    const minCost = await db.cost.min('cost', {
      where: { flightId }
    });
    return minCost;
  } catch (err) {}
};

const findById = async id => {
  try {
    const cost = await db.cost.findOne({
      where: { id },
      include: [{ model: db.seatType, attributes: ['name'] }, { model: db.luggageOption, attributes: ['id', 'name'] }],
      attributes: ['id', 'cost', 'flightId']
    });
    const { dataValues, seatType, luggageOption } = cost;
    return {
      cost: dataValues,
      seatType: seatType.dataValues,
      luggageOption: luggageOption.dataValues
    };
  } catch (err) {}
};

const add = async cost => {
  try {
    const newCost = await db.cost.create(cost);
    return newCost.dataValues;
  } catch (err) {}
};

const update = async cost => {
  try {
    const updatedCost = await db.cost.update(cost, { where: { id: cost.id } });
    return updatedCost;
  } catch (err) {}
};

module.exports = { findByFlightId, findMinCostByFlightId, findById, add, update };
