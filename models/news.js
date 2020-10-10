'use strict';

/**
 * News Model
 * @module models/news
 */

/**
 * Color model definition
 * @param {object} sequelize - Sequelize object 
 * @param {object} DataTypes - Sequelize Datatypes object
 * @return {object} News Model
 */
module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
    },
  }, {});
  return News;
};
