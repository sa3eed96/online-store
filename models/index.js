'use strict';

/**
 * sequelize configuration file
 * @module models/index
 */

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


module.exports = db;

const productSeeder =require('../seeders/20200813003652-product');
const ColorSeeder =require('../seeders/20200813005034-color');
const SubcategorySeeder =require('../seeders/20200812171956-subcategory');
const CategorySeeder =require('../seeders/20200812171946-category');
const UserSeeder = require('../seeders/20200812003038-User');
const AddressSeeder = require('../seeders/20200812170734-address');
const PurchaseSeeder = require('../seeders/20201005005549-purchase');
const ShipmentSeeder = require('../seeders/20201005010321-shipment');
const PurchaseDetailSeeder = require('../seeders/20201005011112-purchasedetails');
const UserRateSeeder = require('../seeders/20201005011636-userrate');
const PasswordResetSeeder = require('../seeders/20201005130419-passwordreset');
const DiscountSeeder = require('../seeders/20201009170822-discount');
const NewsSeeder = require('../seeders/20201010164614-news');

const seed = async ()=>{
    await sequelize.sync({force: true});

    await UserSeeder.up();
    await AddressSeeder.up();
    await CategorySeeder.up();
    await SubcategorySeeder.up();
    await DiscountSeeder.up();
    await productSeeder.up();
    await ColorSeeder.up();
    await ShipmentSeeder.up();
    await PurchaseSeeder.up();
    await UserRateSeeder.up();
    await PurchaseDetailSeeder.up();
    await PasswordResetSeeder.up();
    await NewsSeeder.up();
    console.log('finished');
};
seed();
