'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmailLink = sequelize.define('EmailLink', {
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        is: /email|password/
      }
    },
  }, {});
  EmailLink.associate = function (models) {
    models.EmailLink.belongsTo(models.User, { onDelete: 'CASCADE' });
  };
  return EmailLink;
};
