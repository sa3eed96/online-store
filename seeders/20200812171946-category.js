'use strict';

const Category = require('../models/index').Category;
const sequelize =require('../models/index').sequelize;


module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return Category.bulkCreate([{
        name: 'Home'
      },{
        name: 'Sports'
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
