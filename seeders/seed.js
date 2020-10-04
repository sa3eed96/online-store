const productSeeder =require('../seeders/20200813003652-product');
const ColorSeeder =require('../seeders/20200813005034-color');
const SubcategorySeeder =require('../seeders/20200812171956-subcategory');
const CategorySeeder =require('../seeders/20200812171946-category');
const UserSeeder = require('../seeders/20200812003038-User');
const AddressSeeder = require('../seeders/20200812170734-address');
const sequelize =require('../models/index').sequelize;

const seed = async ()=>{
    await sequelize.sync({force: true});

    await UserSeeder.up();
    await AddressSeeder.up();
    await CategorySeeder.up();
    await SubcategorySeeder.up();
    await productSeeder.up();
    await ColorSeeder.up();
};

module.exports = seed;