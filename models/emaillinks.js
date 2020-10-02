'use strict';

/**
 * EmailLink Model
 * @module models/emaillink
 */

/**
 * EmailLink model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} EmailLink Model
 */
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
