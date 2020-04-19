'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shipment = sequelize.define('Shipment', {
    delivery: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            isAfter: Date(),
        },
    },
    delivered: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
        validate:{
            isBool: true,
        },
    },
  }, {});

  Shipment.associate = function (models) {
    models.Shipment.hasOne(models.Purchase);
    models.Shipment.belongsTo(models.Address);
  };
  return Shipment;
};
