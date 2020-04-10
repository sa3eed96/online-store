'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define('Rate', {
    rate: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), //eslint-disable new-cap
      default: [0, 0, 0, 0, 0],
    },
  }, {});
  Rate.associate = function(models) {
    models.Rate.belongsTo(models.Product, { onDelete: 'CASCADE' });
  };
  return Rate;
};
