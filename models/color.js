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
    images:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  }, {});
  Color.associate = function (models) {
    models.Color.belongsTo(models.Product, { onDelete: 'CASCADE' });
  };
  return Color;
};
