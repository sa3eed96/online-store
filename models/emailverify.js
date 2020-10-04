'use strict';

/**
 * EmailVerify Model
 * @module models/emailverify
 */

/**
 * EmailVerify model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} EmailVerify Model
 */
module.exports = (sequelize, DataTypes) => {
  const EmailVerify = sequelize.define('EmailVerify', {
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  EmailVerify.associate = function (models) {
    models.EmailVerify.belongsTo(models.User, { onDelete: 'CASCADE' });
  };
  return EmailVerify;
};
