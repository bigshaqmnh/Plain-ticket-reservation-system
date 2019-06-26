const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findByEmail = async email => {
  const user = await db.user.findOne({
    where: { email }
  });

  if (!user) return;

  return user.dataValues;
};

const checkIfExists = async email => {
  const userExists = await db.user.count({
    where: { email }
  });

  return userExists ? true : false;
};

const add = async user => await db.user.create(user);

const update = async (id, user) => {
  const updated = await db.user.update(user, { where: { id } });

  const wasUpdated = updated[0] > 0;

  return wasUpdated;
};

const comparePasswords = async (reqPassword, dbPassword) => await bcrypt.compare(reqPassword, dbPassword);

const hashPassword = async password => await bcrypt.hash(password, 10);

const generateToken = async payload => await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });

module.exports = { findByEmail, checkIfExists, add, update, comparePasswords, hashPassword, generateToken };
