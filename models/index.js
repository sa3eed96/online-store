'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const env = process.env.NODE_ENV || "development";

let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(process.env.POSTGRES_URL, {logging: false});
} else {
  sequelize = new Sequelize(process.env.DB_LOCAL_NAME,
    process.env.DB_LOCAL_USER, process.env.DB_LOCAL_PASSWORD, {
      host: process.env.DB_LOCAL_HOST,
      dialect: 'postgres',
      logging: false
    });
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

const syncDB = async()=>{
 await db.sequelize.sync();
};
syncDB();

module.exports = db;
