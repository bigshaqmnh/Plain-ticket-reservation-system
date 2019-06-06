const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findByEmail = async email => {
  try {
    const user = await db.models.user.findOne({
      where: { email }
    });
    return user.dataValues;
  } catch (err) {}
};

const findById = async id => {
  try {
    const user = await db.user.findOne({
      where: { id },
      attributes: ['username', 'email']
    });
    return user.dataValues;
  } catch (err) {}
};

const comparePasswords = async (reqPassword, dbPassword) => await bcrypt.compare(reqPassword, dbPassword);

const generateToken = async payload => await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 36000 });

module.exports = { findByEmail, findById, comparePasswords, generateToken };
