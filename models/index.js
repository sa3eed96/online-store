'use strict';
const env = process.env.NODE_ENV || 'development';
const config = env === "production" ? {url: process.env.POSTGRES_URL}:{
    "username": "",
    "password": process.env.DB_LOCAL_PASS,
    "database": "ecom_dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases": false
}
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url);
} else {
  sequelize = new Sequelize(config.database,
    config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) &&
      (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
