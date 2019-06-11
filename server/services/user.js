const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findByEmail = async email => {
  try {
    const user = await db.user.findOne({
      where: { email },
      attributes: ['id', 'username', 'email']
    });
    return user && user.dataValues;
  } catch (err) {
    throw new Error(err);
  }
};

const checkIfExists = async email => {
  try {
    const userExists = await db.user.count({
      where: { email }
    });
    return userExists ? true : false;
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

const hashPassword = async password => await bcrypt.hash(password, 10);

const generateToken = async payload => await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 36000 });

module.exports = { findByEmail, checkIfExists, add, comparePasswords, hashPassword, generateToken };
