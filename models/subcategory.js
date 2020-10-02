'use strict';

/**
 * Subcategory Model
 * @module models/subcategory
 */

/**
 * Subcategory model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} Subcategory Model
 */
module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define('Subcategory', {
    name: {
      type:DataTypes.STRING,
      primaryKey: true,
      validate:{
        is:/[a-z|\s]+/i
      },
    },
  }, {});

  Subcategory.associate = function (models) {
    models.Subcategory.belongsTo(models.Category);
    models.Subcategory.hasMany(models.Product);
  };
  return Subcategory;
};
