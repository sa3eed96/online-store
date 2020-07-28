'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        is: /Egypt/,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        is: /Cairo|Alexandria/,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        is: /^[a-zA-Z0-9]+(\s|\w)*$/,
      },
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is:/[0-9]{3,6}/
      },
    },
  }, {});
  Address.associate = function (models) {
    models.Address.belongsTo(models.User, { onDelete: 'CASCADE' });
    models.Address.hasMany(models.Shipment);
  };
  return Address;
};
