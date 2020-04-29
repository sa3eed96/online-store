'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shipment = sequelize.define('Shipment', {
    delivery: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    delivered: {
        type: DataTypes.BOOLEAN,
        default: 0,
    },
  }, {});

  Shipment.associate = function (models) {
    models.Shipment.hasOne(models.Purchase);
    models.Shipment.belongsTo(models.Address, { onDelete: 'SET NULL' });
  };
  return Shipment;
};
