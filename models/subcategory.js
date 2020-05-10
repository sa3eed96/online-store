'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define('Subcategory', {
    name: {
      type:DataTypes.STRING,
      primaryKey: true,
      validate:{
        isAlpha: true
      },
    },
  }, {});

  Subcategory.associate = function (models) {
    models.Subcategory.belongsTo(models.Category);
    models.Subcategory.hasMany(models.Product);
  };
  return Subcategory;
};
