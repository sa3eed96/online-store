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

// db.sequelize.sync({ force: true}).then(async () => {
//   console.log('Database Created!!');
  
//  await db.Admin.create({
//    email:'root@onlinestore.com',
//    password:'password1234',
//    role: 'super', 
//  });

//  await db.Admin.create({
//    email:'admin@onlinestore.com',
//    password:'password1234',
//    role: 'user', 
//  });

//   await db.Category.create({
//     name: 'Home'
//   });

//   await db.Subcategory.create({
//     name: 'Kitchen',
//     CategoryName: 'Home',
//   });

//   await db.Subcategory.create({
//     name: 'Decor',
//     CategoryName: 'Home',
//   });

//   await db.Product.create({
//     name: 'RCR Glass Water Bottle - Clear',
//     description: 'Glass and clear Bottle with diffrent colors for water and juice, Dish washer proof',
//     price: '4',
//     SubcategoryName: 'Kitchen',
//   });

//   await db.Specification.create({
//     ProductId: '1',
//     weight: '1608 gm',
//     width: ' 26 cm',
//     height: '32 cm',
//     brand: 'RCR',
//     specs: 'Type:Water Bottle,Material:Glass',
//   });

//   await db.Rate.create({
//     ProductId: '1',
//     rate: [0, 0, 0, 0, 0],
//   });

//   await db.Color.create({
//     ProductId: '1',
//     Color: 'red',
//     stockCount: '10'
//   });
//   await db.Image.create({
//     ColorId: '1',
//     image: 'https://ik.imagekit.io/rvfdomceug/red_MVo3o3tlUvoU.jpg'
//   });
//   await db.Image.create({
//     ColorId: '1',
//     image: 'https://ik.imagekit.io/rvfdomceug/redbottle_zc15Lw8_a.jpg',
//   });

//   await db.Color.create({
//     ProductId: '1',
//     Color: 'silver',
//     stockCount: '2'
//   });
//   await db.Image.create({
//     ColorId: '2',
//     image: 'https://ik.imagekit.io/rvfdomceug/silver_EO4EGRrXQw.jpg',
//   });

//   await db.Product.create({
//     name: 'Indes Fuggerhaus Polyester Grey 140 x 245 cm Denton Single Panel Curtain',
//     description: 'The grey colored curtain "Denton" comes in a classic design and fits into the most diverse living styles. Incorporated eyelets ensure a foolproof suspension. With this blackout curtain you can dim your room, an ideal sunscreen for bedroom or nursery',
//     price: '150',
//     SubcategoryName: 'Decor',
//   });

//   await db.Specification.create({
//     ProductId: '2',
//     weight: '1 kg',
//     width: ' 140 cm',
//     height: '245 cm',
//     brand: 'Indes Fuggerhaus',
//     specs: 'Material:polyester,Type:Single Curtain Panels,Pattern:Solid,Country of Origin:Germany,Fabric Quality:Blackout,Suspension:Eyelets',
//   });

//   await db.Rate.create({
//     ProductId: '2',
//     rate: [0, 0, 0, 0, 0],
//   });

//   await db.Color.create({
//     ProductId: '2',
//     Color: 'Grey',
//     stockCount: '50'
//   });
//   await db.Image.create({
//     ColorId: '3',
//     image: 'https://ik.imagekit.io/rvfdomceug/cur1_aH7fuMOWc5X.jpg'
//   });
//   await db.Image.create({
//     ColorId: '3',
//     image: 'https://ik.imagekit.io/rvfdomceug/cur2_nIKc8Ce3MJh.jpg',
//   });

  
//   await db.Product.create({
//     name: 'DIY Removable Wall Stickers For Living Room Home Decor -Bead curtain',
//     description: 'Removable wall stickers for iving and bed rooms, water resistant and totally removable and adhesive.',
//     price: '184',
//     SubcategoryName: 'Decor',
//   });

//   await db.Specification.create({
//     ProductId: '3',
//     weight: '-',
//     width: ' 70 cm',
//     height: '50 cm',
//     brand: 'Other',
//     specs: 'Theme:Cartoon,Material:PVC,Installation Type:Self-Adhesive',
//   });

//   await db.Rate.create({
//     ProductId: '3',
//     rate: [0, 0, 0, 0, 0],
//   });

//   await db.Color.create({
//     ProductId: '3',
//     Color: 'Black',
//     stockCount: '28'
//   });
//   await db.Image.create({
//     ColorId: '4',
//     image: 'https://ik.imagekit.io/rvfdomceug/d1_TZMPr5Luoy7.jpg'
//   });
//   await db.Image.create({
//     ColorId: '4',
//     image: 'https://ik.imagekit.io/rvfdomceug/d2_L4LybozO6L2.jpg',
//   });

// });

module.exports = db;
