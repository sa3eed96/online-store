'use strict';
module.exports = (sequelize, DataTypes) => {
  const EmailLinks = sequelize.define('EmailLinks', {
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  EmailLinks.associate = function (models) {
    models.EmailLinks.belongsTo(models.User, { onDelete: 'CASCADE' });
  };
  return EmailLinks;
};
