const airplaneService = require('./services/airplane');

const newAirplane = {
  name: 'Cessna Citation Mustang',
  type: 'C510',
  max_luggage_carry_weight: 36480.37
};

const updateAirplane = {
  name: '	Cirrus SR-22',
  type: 'SR22',
  max_luggage_carry_weight: 36480.37
};

const runTests = async () => {
  console.log('-----------------------');
  console.log('TEST AIRPLANES SERVICE');
  console.log('-----------------------');

  console.log('TEST getAllFrom(3)');
  const getAll = await airplaneService.getAllFrom(3);
  console.log(getAll);

  console.log('TEST findByField(`type`, `A320`)');
  const findByField = await airplaneService.findByField(`type`, `A320`);
  console.log(findByField);

  console.log('TEST findByField(`max_luggage_carry_weight`, `15738.53`)');
  const findByField2 = await airplaneService.findByField(`max_luggage_carry_weight`, 15738.53);
  console.log(findByField2);

  console.log('TEST findById(5)');
  const findById = await airplaneService.findById(5);
  console.log(findById);

  console.log('TEST add');
  const add = await airplaneService.add(newAirplane);
  console.log(add);

  console.log('TEST update');
  const update = await airplaneService.update(updateAirplane);
  console.log(update);

  console.log('TEST remove(4)');
  const remove = await airplaneService.remove(4);
  console.log(remove);
};

module.exports = { runTests };
