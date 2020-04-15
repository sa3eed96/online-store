const AdminBroExpressjs = require('admin-bro-expressjs');
const adminBro = require('../admin');

const router = AdminBroExpressjs.buildRouter(adminBro);

module.exports = router;
