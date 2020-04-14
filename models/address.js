'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        is: /^[a-z]+(\s|[a-z])*$/,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        is: /^[a-z]+(\s|[a-z])*$/,
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 2,
        is: /^[a-z]+(\s|[a-z])*$/,
      },
    },
    address:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /(\d|\s)+/i,
      },
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
  }, {});
  Address.associate = function (models) {
    models.Address.User = models.Address.belongsTo(models.User, { onDelete: 'CASCADE' });
  };
  return Address;
};
