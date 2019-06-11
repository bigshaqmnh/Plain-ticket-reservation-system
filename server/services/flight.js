const _genIncludeStatement = (foreignKey, inputString) => {
  return [
    {
      model: db.airport,
      as: foreignKey,
      where: {
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
    }
  ];
};

const find = async ({ page, query: inputString, limit: resLimit } = {}) => {
  const limit = resLimit || 20;
  const pageNum = +page || 1;
  const offset = pageNum * limit - limit;

  try {
    let flights = [];

    if (inputString) {
      const depFlights = await db.flight.findAll({
        include: _genIncludeStatement('departureAirport', inputString),
        offset,
        order: [['id', 'ASC']]
      });

      const arrFlights = await db.flight.findAll({
        include: _genIncludeStatement('arrivalAirport', inputString),
        offset,
        order: [['id', 'ASC']]
      });

      flights = Array.prototype.concat(depFlights, arrFlights).slice(0, limit);
    } else {
      flights = await db.flight.findAll({
        offset,
        limit,
        order: [['id', 'ASC']]
      });
    }

    return {
      data: flights.map(flight => flight.dataValues),
      nextPage: pageNum + 1
    };
  } catch (err) {
    throw new Error(err);
  }
};

const findByParams = async ({ depCountry, depCity, arrCountry, arrCity, departureTime, limit: resLimit }) => {
  const limit = resLimit || 20;
  const from = new Date(departureTime);
  const to = new Date(from.getTime() + 86400000);

  try {
    const flights = await db.flight.findAll({
      where: {
        departureTime: {
          [db.op.between]: [from, to]
        }
      },
      include: [
        {
          model: db.airport,
          as: 'departureAirport',
          attributes: ['name'],
          where: { country: depCountry, city: depCity }
        },
        {
          model: db.airport,
          as: 'arrivalAirport',
          attributes: ['name'],
          where: { country: arrCountry, city: arrCity }
        },
        { model: db.airplane, attributes: ['name'] }
      ],
      limit
    });

    return flights.map(flight => flight.dataValues);
  } catch (err) {
    throw new Error(err);
  }
};

const findById = async id => {
  try {
    const flight = await db.flight.findOne({
      where: { id },
      include: [
        { model: db.airport, as: 'departureAirport', attributes: ['name', 'country', 'city'] },
        { model: db.airport, as: 'arrivalAirport', attributes: ['name', 'country', 'city'] },
        { model: db.airplane, attributes: ['name'] }
      ],
      attributes: ['departureTime', 'arrivalTime', 'isCancelled']
    });
    const { dataValues, departureAirport, arrivalAirport, airplane } = flight;
    return {
      flight: dataValues,
      departureAirport: departureAirport.dataValues,
      arrivalAirport: arrivalAirport.dataValues,
      airplane: airplane.dataValues
    };
  } catch (err) {
    throw new Error(err);
  }
};

const add = async flight => {
  try {
    await db.flight.create(flight);
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (id, flight) => {
  try {
    await db.flight.update(flight, { where: { id } });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { find, findByParams, findById, add, update };
