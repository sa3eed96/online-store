'use strict';
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
    models.Category.hasMany(models.Product);
  };
  return Category;
};
