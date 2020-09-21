'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRate = sequelize.define('UserRate', {
    rate: {
      type: DataTypes.INTEGER,
      validate: {
        min:0,
        max:4,
        isInt: true,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
  }, {});
  UserRate.associate = function (models) {
      models.UserRate.hasMany(models.PurchaseDetail, {onDelete: 'CASCADE'})
  };
  return UserRate;
};
