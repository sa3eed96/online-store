'use strict';
module.exports = (sequelize, DataTypes) => {
  const Specification = sequelize.define('Specification', {
    weight: {
        type: DataTypes.STRING
    },
    width: {
        type: DataTypes.STRING
    },
    height: {
        type: DataTypes.STRING
    },
    colors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    brand: {
      type: DataTypes.STRING,
    },
    specs: {
        type: DataTypes.TEXT,
    },
  }, {});
  Specification.associate = function(models) {
    models.Specification.belongsTo(models.Product, { onDelete: 'CASCADE' });
  };
  return Specification;
};
