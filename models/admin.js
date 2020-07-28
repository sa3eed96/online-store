const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
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
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /super|user/,
        },
      }
    }, {});

    Admin.beforeSave((admin, options) => {
      if (admin.changed('password')) {
        return bcrypt.hash(admin.password, 10).then((hash) =>
          admin.password = hash);
      }
    });
    
    return Admin
};