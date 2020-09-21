const bcrypt = require('bcrypt');

module.exports = (password, passwordHash)=> {
    return bcrypt.compare(password, passwordHash);
};