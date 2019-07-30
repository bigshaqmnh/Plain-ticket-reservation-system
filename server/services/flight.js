const _genWhereStatement = {
  airplaneQuery: inputString => ({
    name: { [db.op.iLike]: `%${inputString}%` }
  }),
  airportQuery: inputString => ({
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
  }),
  location: (country, city) => ({ country, city })
};

const _genIncludeStatement = (model, as, where = {}, attributes = ['id', 'name']) => ({
  model,
  as,
  where,
  attributes
});

const find = async ({ page, query: inputString, limit: resLimit } = {}) => {
  console.log('QUERY: ', inputString);
  const limit = resLimit || 10;
  const pageNum = +page || 1;
  const offset = pageNum * limit - limit;

  let flights = {};
  const attributes = ['id', 'departureTime', 'arrivalTime', 'luggageOverweightCost', 'isCancelled'];

  if (inputString) {
    const { rows: depFlights, count: depFlightsCount } = await db.flight.findAndCountAll({
      include: [
        _genIncludeStatement(db.airport, 'departureAirport', _genWhereStatement.airportQuery(inputString)),
        _genIncludeStatement(db.airport, 'arrivalAirport'),
        _genIncludeStatement(db.airplane, 'airplane')
      ],
      offset,
      attributes,
      order: [['id', 'ASC']]
    });

    const { rows: arrFlights, count: arrFlightsCount } = await db.flight.findAndCountAll({
      include: [
        _genIncludeStatement(db.airport, 'arrivalAirport', _genWhereStatement.airportQuery(inputString)),
        _genIncludeStatement(db.airport, 'departureAirport'),
        _genIncludeStatement(db.airplane, 'airplane')
      ],
      offset,
      attributes,
      order: [['id', 'ASC']]
    });

    const data = Array.prototype.concat(depFlights, arrFlights).slice(0, limit);
    flights = {
      data,
      count: depFlightsCount + arrFlightsCount
    };
  } else {
    const { rows, count } = await db.flight.findAndCountAll({
      include: [
        _genIncludeStatement(db.airport, 'departureAirport'),
        _genIncludeStatement(db.airport, 'arrivalAirport'),
        _genIncludeStatement(db.airplane, 'airplane')
      ],
      offset,
      limit,
      attributes,
      order: [['id', 'ASC']]
    });

    const data = rows.map(flight => flight.dataValues);

    flights = {
      data,
      count
    };
  }

  if (!flights.count) {
    return;
  }

  return flights;
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
      _genIncludeStatement(db.airport, 'departureAirport', _genWhereStatement.location(depCountry, depCity)),
      _genIncludeStatement(db.airport, 'arrivalAirport', _genWhereStatement.location(arrCountry, arrCity)),
      _genIncludeStatement(db.airplane, 'airplane')
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
  const attributes = ['name', 'country', 'city'];

  const flights = await db.flight.findAll({
    where: { id: { [db.op.in]: ids } },
    include: [
      _genIncludeStatement(db.airport, 'departureAirport', {}, attributes),
      _genIncludeStatement(db.airport, 'arrivalAirport', {}, attributes),
      _genIncludeStatement(db.airplane, 'airplane')
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

const findById = async flightId => {
  const flight = await db.flight.findOne({
    where: { id: flightId },
    include: [
      _genIncludeStatement(db.airport, 'departureAirport'),
      _genIncludeStatement(db.airport, 'arrivalAirport'),
      _genIncludeStatement(db.airplane, 'airplane')
    ],
    attributes: ['id', 'departureTime', 'arrivalTime', 'luggageOverweightCost', 'isCancelled']
  });

  const { departureAirport, arrivalAirport, airplane } = flight.dataValues;

  return {
    ...flight.dataValues,
    departureAirportId: departureAirport,
    arrivalAirportId: arrivalAirport,
    airplaneId: airplane
  };
};

const add = async flight => {
  const newFlight = await db.flight.create(flight);
  const fullFlightInfo = await findById(newFlight.id);

  return fullFlightInfo;
};

const update = async (id, flight) => {
  const updated = await db.flight.update(flight, { where: { id } });

  const wasUpdated = updated[0] > 0;

  return wasUpdated;
};

module.exports = { find, findByParams, findByIds, findById, add, update };
