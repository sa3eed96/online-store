'use strict';
module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define('Color', {
    Color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stockCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        isInt: true,
      },
    },
  }, {});
  Color.associate = function (models) {
    models.Color.belongsTo(models.Product, { onDelete: 'CASCADE' });
    models.Color.hasMany(models.Image);
  };
  return Color;
};
