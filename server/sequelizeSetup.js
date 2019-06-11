'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_DIALECT } = process.env;
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, { host: DB_HOST, dialect: DB_DIALECT });
const db = {};
const modelsPath = path.resolve(__dirname, 'database', 'models');

fs.readdirSync(modelsPath)
  .filter(file => {
    return file.indexOf('.') !== 0 && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(modelsPath, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.op = Sequelize.Op;

global.db = db;
