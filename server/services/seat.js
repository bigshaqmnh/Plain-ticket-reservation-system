const findByAirplaneId = async airplaneId => {
  const seats = await db.seat.findAll({
    where: { airplaneId },
    include: [{ model: db.seatType, attributes: ['id', 'name'] }],
    attributes: ['id', 'row', 'seat', 'isBooked']
  });

  if (!seats.length) return;

  return seats.map(seat => ({ ...seat.dataValues, seatType: seat.seatType.dataValues }));
};

const getNumberOfUnbooked = async airplaneIds => {
  const seats = await db.seat.findAll({
    where: { airplaneId: { [db.op.in]: airplaneIds }, isBooked: false },
    attributes: ['airplaneId']
  });

  if (!seats.length) return;

  const numberOfUnbookedSeats = airplaneIds.map(airplaneId => ({
    airplaneId,
    numberOfUnbookedSeats: seats.reduce(
      (count, seat) => (seat.dataValues.airplaneId === airplaneId ? count + 1 : count),
      0
    )
  }));

  return numberOfUnbookedSeats;
};

const findByIds = async ids => {
  const seats = await db.seat.findAll({
    where: { id: { [db.op.in]: ids } },
    include: [{ model: db.seatType, attributes: ['name'] }],
    attributes: ['id', 'row', 'seat', 'floor']
  });

  if (!seats.length) return;

  return seats.map(seat => ({ ...seat.dataValues }));
};

const add = async seat => await db.seat.create(seat);

const update = async (id, seat) => {
  const updated = await db.seat.update(seat, { where: { id } });

  const wasUpdated = updated[0] > 0;

  return wasUpdated;
};

module.exports = { findByAirplaneId, getNumberOfUnbooked, findByIds, add, update };
