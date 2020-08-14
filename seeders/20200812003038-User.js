'use strict';

const User = require('../models/index').User;
const sequelize =require('../models/index').sequelize;

module.exports = {
  up: () => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example: */
      return User.bulkCreate([{
        firstName: 'john',
        lastName: 'doe',
        email:'john@site.com',
        password:'password1234',
        phone: '01112223334',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { individualHooks: true });
    
  },

  down: async() => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      await sequelize.sync();
      return User.sync({ force: true });
  }
};
