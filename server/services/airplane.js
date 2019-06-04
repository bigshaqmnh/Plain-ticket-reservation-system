const getAllFrom = async offset => {
  const limit = offset + process.env.FIND_LIMIT;
  try {
    const airplanes = db.models.airplane.findAll({ offset, limit });
    // console.log('found airplanes: ', airplanes);
    return airplanes;
  } catch (err) {}
};

const findByField = async (field, value) => {
  try {
    const airplane = await db.models.airplane.findOne({
      where: {
        [field]: value
      }
    });
    // console.log('found by field', field, ':', airplane);
    return airplane.dataValues;
  } catch (err) {}
};

const findById = async id => {
  try {
    const airplane = await db.models.airplane.findByPk(id);
    // console.log('found by id', id, ':', airplane);
    return airplane.dataValues;
  } catch (err) {}
};

const add = async airplane => {
  try {
    const newAirplane = await db.models.airplane.create(airplane);
    // console.log('added airplane: ', newAirplane);
    return newAirplane;
  } catch (err) {}
};

const update = async airplane => {
  try {
    const updatedAirplane = await db.models.airplane.update(airplane, { where: { id: airplane.id } });
    // console.log('updated airplane: ', updatedAirplane);
    return updatedAirplane;
  } catch (err) {}
};

const remove = async id => {
  try {
    const deletedAirplane = await db.models.airplane.destroy({ where: { id } });
    // console.log('deleted airplane: ', deletedAirplane);
    return deletedAirplane;
  } catch (err) {}
};

module.exports = { getAllFrom, findByField, findById, add, update, remove };
