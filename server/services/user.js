const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findByEmail = async email => {
  try {
    const user = await db.models.user.findOne({
      where: { email }
    });
    return user.dataValues;
  } catch (err) {
    throw new Error(err);
  }
};

const findById = async id => {
  try {
    const user = await db.user.findOne({
      where: { id },
      attributes: ['username', 'email']
    });
    return user.dataValues;
  } catch (err) {
    throw new Error(err);
  }
};

const add = async user => {
  try {
    await db.user.create(user);
  } catch (err) {
    throw new Error(err);
  }
};

const comparePasswords = async (reqPassword, dbPassword) => await bcrypt.compare(reqPassword, dbPassword);

const generateToken = async payload => await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 36000 });

module.exports = { findByEmail, findById, add, comparePasswords, generateToken };
