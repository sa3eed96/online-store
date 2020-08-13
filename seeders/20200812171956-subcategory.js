'use strict';

const Subcategory = require('../models/index').Subcategory;
const sequelize =require('../models/index').sequelize;


module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return Subcategory.bulkCreate([{
        name: 'Kitchen',
        CategoryName: 'Home',
      },{
        name: 'Decor',
        CategoryName: 'Home',
      },{
        name: 'Dumbells',
        CategoryName: 'Sports',
      },{
        name: 'Belts',
        CategoryName: 'Sports',
      }], { individualHooks: true });
    
  },

  down: () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return sequelize.sync({ force: true });
  }
};
