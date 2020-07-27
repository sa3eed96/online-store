'use strict';
module.exports = (sequelize, DataTypes) => {
  const Refund = sequelize.define('Refund', {
    amount: {
      type: DataTypes.INTEGER, //eslint-disable new-cap
      allowNull: false,
    },
    paymentType: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            is: /paypal|cash/,
        },
    },
    }, {});
    Refund.associate = function(models) {
      models.Refund.belongsTo(models.User, { onDelete: 'CASCADE' });
    };

  return Refund;
};
