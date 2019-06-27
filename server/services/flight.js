const _genIncludeStatement = ({ foreignKey, inputString, location }) => ({
  model: db.airport,
  as: foreignKey,
  where: inputString
    ? {
        [db.op.or]: [
          {
            name: { [db.op.iLike]: `%${inputString}%` }
          },
          {
            country: { [db.op.iLike]: `%${inputString}%` }
          },
          {
            city: { [db.op.iLike]: `%${inputString}%` }
          }
        ]
      }
    : location,
  attributes: ['name']
});

const find = async ({ page, query: inputString, limit: resLimit } = {}) => {
  const limit = resLimit || 10;
  const pageNum = +page || 1;
  const offset = pageNum * limit - limit;

  let flights = [];
  const attributes = ['id', 'departureTime', 'arrivalTime', 'luggageOverweightCost', 'isCancelled'];

  if (inputString) {
    const depFlights = await db.flight.findAll({
      include: [_genIncludeStatement({ foreignKey: 'departureAirport', inputString })],
      offset,
      attributes,
      order: [['id', 'ASC']]
    });

    const arrFlights = await db.flight.findAll({
      include: [_genIncludeStatement({ foreignKey: 'arrivalAirport', inputString })],
      offset,
      attributes,
      order: [['id', 'ASC']]
    });

    flights = Array.prototype.concat(depFlights, arrFlights).slice(0, limit);
  } else {
    flights = await db.flight.findAll({
      offset,
      limit,
      attributes,
      order: [['id', 'ASC']]
    });
  }

  if (!flights.length) {
    return;
  }

  const data = flights.map(flight => flight.dataValues);

  return data.length > limit
    ? {
        data,
        nextPage: pageNum + 1
      }
    : { data };
};

const findByParams = async ({ depCountry, depCity, arrCountry, arrCity, departureTime, page, limit: resLimit }) => {
  const limit = resLimit || 10;
  const pageNum = +page || 1;
  const offset = pageNum * limit - limit;
  const from = new Date(departureTime);
  const to = new Date(from).setDate(from.getDate() + 1);

  const flights = await db.flight.findAll({
    where: {
      departureTime: {
        [db.op.between]: [from, to]
      }
    },
    include: [
      _genIncludeStatement({ foreignKey: 'departureAirport', location: { country: depCountry, city: depCity } }),
      _genIncludeStatement({ foreignKey: 'arrivalAirport', location: { country: arrCountry, city: arrCity } }),
      { model: db.airplane, attributes: ['name'] }
    ],
    offset,
    limit,
    attributes: ['id', 'departureTime', 'arrivalTime', 'luggageOverweightCost', 'isCancelled', 'airplaneId']
  });

  if (!flights.length) {
    return;
  }

  const data = flights.map(flight => ({
    ...flight.dataValues,
    departureAirport: flight.departureAirport.dataValues,
    arrivalAirport: flight.arrivalAirport.dataValues,
    airplane: flight.airplane.dataValues
  }));

  return data.length > limit
    ? {
        data,
        nextPage: pageNum + 1
      }
    : { data };
};

const findByIds = async ids => {
  const flights = await db.flight.findAll({
    where: { id: { [db.op.in]: ids } },
    include: [
      { model: db.airport, as: 'departureAirport', attributes: ['name', 'country', 'city'] },
      { model: db.airport, as: 'arrivalAirport', attributes: ['name', 'country', 'city'] },
      { model: db.airplane, attributes: ['name'] }
    ],
    attributes: ['id', 'departureTime', 'arrivalTime', 'isCancelled']
  });

  if (!flights.length) {
    return;
  }

  return flights.map(flight => ({
    ...flight.dataValues,
    departureAirport: flight.departureAirport.dataValues,
    arrivalAirport: flight.arrivalAirport.dataValues,
    airplane: flight.airplane.dataValues
  }));
};

const add = async flight => await db.flight.create(flight);

const update = async (id, flight) => {
  const updated = await db.flight.update(flight, { where: { id } });

  const wasUpdated = updated[0] > 0;

  return wasUpdated;
};

module.exports = { find, findByParams, findByIds, add, update };
