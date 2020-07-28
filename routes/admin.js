const AdminBroExpressjs = require('admin-bro-expressjs');
const  adminBro  = require('../admin');
const bcrypt = require('bcrypt');
const Admin = require('../models/index').Admin;

const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro,{
    authenticate: async (email, password) => {
        const admin = await Admin.findOne({ where: {email} })
        if (admin) {
          const matched = await bcrypt.compare(password, admin.password);
          if (matched) {
            return admin;
          }
        }
        return false
      },
      cookiePassword: process.env.COOKIE_PASSWORD,
});

module.exports = router;
