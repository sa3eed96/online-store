'use strict';

/**
 * Discount Model
 * @module models/discount
 */

/**
 * Discount model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} Discount Model
 */
module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('Discount', {
    name: {
        type: DataTypes.STRING,
        validate: {
            isLength:{min: 1},
        },
    },
    discount: {
        type: DataTypes.INTEGER,
        default: 0,
        validate: {
            min: 0,
            max: 100,
            isInt: true,
        },
    },
    until: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfter: Date(),
      },
    }
    }, {});
    Discount.associate = function(models) {
      models.Discount.hasMany(models.Product);
    };

  return Discount;
};
