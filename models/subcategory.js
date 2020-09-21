'use strict';
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
