const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CustomError = require('../classes/CustomError');
const error = require('../constants/errors');

const findByEmail = async email => {
  try {
    const user = await db.user.findOne({
      where: { email }
    });

    if (!user) {
      throw new CustomError({ status: error.notFound });
    }

    return user.dataValues;
  } catch (err) {
    throw new CustomError(err);
  }
};

const checkIfExists = async email => {
  try {
    const userExists = await db.user.count({
      where: { email }
    });

    if (!userExists) {
      throw new CustomError({ status: error.notFound });
    }

    return true;
  } catch (err) {
    throw new CustomError(err);
  }
};

const add = async user => {
  try {
    await db.user.create(user);
  } catch (err) {
    throw new CustomError({ status: error.conflict, message: err.message });
  }
};

const comparePasswords = async (reqPassword, dbPassword) => {
  try {
    return await bcrypt.compare(reqPassword, dbPassword);
  } catch (err) {
    throw new CustomError({ status: error.unavailable });
  }
};

const hashPassword = async password => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (err) {
    throw new CustomError({ status: error.unavailable });
  }
};

const generateToken = async payload => {
  try {
    return await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
  } catch (err) {
    throw new CustomError({ status: error.unavailable });
  }
};

module.exports = { findByEmail, checkIfExists, add, comparePasswords, hashPassword, generateToken };
