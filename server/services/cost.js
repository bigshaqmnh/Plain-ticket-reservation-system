const findByFlightId = async flightId => {
  const costs = await db.cost.findAll({
    where: { flightId },
    attributes: ['id', 'cost', 'seatTypeId', 'luggageOptionId']
  });

  if (!costs.length) return;

  return costs.map(cost => cost.dataValues);
};

const findMinCostByFlightId = async flightId =>
  await db.cost.min('cost', {
    where: { flightId }
  });

const findByIds = async ids => {
  const costs = await db.cost.findAll({
    where: { id: { [db.op.in]: ids } },
    include: [{ model: db.luggageOption, attributes: ['id', 'name'] }],
    attributes: ['id', 'cost', 'flightId']
  });

  if (!costs.length) return;

  return costs.map(cost => ({ ...cost.dataValues, luggageOption: cost.luggageOption.dataValues }));
};

const add = async cost => await db.cost.create(cost);

const update = async (id, cost) => {
  const updated = await db.cost.update(cost, { where: { id } });

  const wasUpdated = updated[0] > 0;

  return wasUpdated;
};

module.exports = { findByFlightId, findMinCostByFlightId, findByIds, add, update };
