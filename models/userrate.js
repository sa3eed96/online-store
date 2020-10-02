'use strict';

/**
 * UserRate Model
 * @module models/userrate
 */

/**
 * UserRate model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} UserRate Model
 */
module.exports = (sequelize, DataTypes) => {
  const UserRate = sequelize.define('UserRate', {
    rate: {
      type: DataTypes.INTEGER,
      validate: {
        min:0,
        max:4,
        isInt: true,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
  }, {});
  UserRate.associate = function (models) {
      models.UserRate.hasMany(models.PurchaseDetail, {onDelete: 'CASCADE'})
  };
  return UserRate;
};
