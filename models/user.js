'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        min: 2,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        min: 2,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    loginCount: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: true,
        min: 0,
        max: 5,
      },
    },
    lockUntil: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfter: Date(),
      },
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get: function(){
        return this.getDataValue('firstName') +
          ' ' + this.getDataValue('lastName');
      }
    },
    isLocked: {
      type: DataTypes.VIRTUAL,
      get: function(){
        return this.getDataValue('lockUntil') > new Date();
      }
    }
  },{});

  User.prototype.incLoginCountAndLock = function(){
    const loginCount = this.getDataValue('loginCount');
    if (loginCount === 5) {
      this.setDataValue('loginCount', 0);

      let time = new Date();
      this.setDataValue('lockUntil', new Date(time.setTime(time.getTime() + 3600000 * 3)));
    }
    else
      this.setDataValue('loginCount', loginCount + 1);
    return this.save();
  };

  User.prototype.successfulLogin = function(){
    this.setDataValue('loginCount', 0);
    return this.save();
  }

  User.beforeSave((user, options) => {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 10).then((hash) =>
        user.password = hash);
    }
  });

  User.associate = function (models) {
    models.User.hasMany(models.Address);
    models.User.hasMany(models.Comment);
    models.User.hasMany(models.Purchase);
  };
  return User;
};
