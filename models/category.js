'use strict';

/**
 * Category Model
 * @module models/category
 */


/**
 * Category model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} Category Model
 */
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type:DataTypes.STRING,
      primaryKey: true,
      validate:{
        isAlpha: true
      },
    },
  }, {});

  Category.associate = function (models) {
    models.Category.hasMany(models.Subcategory);
  };
  return Category;
};
