'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
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

db.sequelize.sync({ force: true}).then(async () => {
  console.log('Database Created!!');
  
 await db.Admin.create({
   email:'root@onlinestore.com',
   password:'password1234',
   role: 'super', 
 });

 await db.Admin.create({
   email:'admin@onlinestore.com',
   password:'password1234',
   role: 'user', 
 });

  await db.Category.create({
    name: 'Home'
  });

  await db.Subcategory.create({
    name: 'Kitchen',
    CategoryName: 'Home',
  });

  await db.Product.create({
    name: 'Glass Bottle',
    description: 'Glass Bottle for water and juice',
    price: '4'
  });

  await db.Specification.create({
    ProductId: '1',
    weight: '320 gm',
    width: ' 15 cm',
    height: '32 cm',
    brand: 'Ikea',
    specs: 'heat resistent',
  });

  await db.Rate.create({
    ProductId: '1',
    rate: [0, 0, 0, 0, 0],
  });

  await db.Color.create({
    ProductId: '1',
    Color: 'red',
    stockCount: '10'
  });
  await db.Image.create({
    ColorId: '1',
    image: 'https://ik.imagekit.io/rvfdomceug/red_MVo3o3tlUvoU.jpg'
  });
  await db.Image.create({
    ColorId: '1',
    image: 'https://ik.imagekit.io/rvfdomceug/redbottle_zc15Lw8_a.jpg',
  });

  await db.Color.create({
    ProductId: '1',
    Color: 'silver',
    stockCount: '2'
  });
  await db.Image.create({
    ColorId: '2',
    image: 'https://ik.imagekit.io/rvfdomceug/silver_EO4EGRrXQw.jpg',
  });

});

module.exports = db;
