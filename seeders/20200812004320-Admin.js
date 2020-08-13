'use strict';
const Admin = require('../models/index').Admin;
const sequelize =require('../models/index').sequelize;

module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return Admin.bulkCreate([{
        email:'root@onlinestore.com',
        password:'password1234',
        role: 'super', 
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        email:'admin@onlinestore.com',
        password:'password1234',
        role: 'user', 
        createdAt: new Date(),
        updatedAt: new Date()
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
