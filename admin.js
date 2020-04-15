const AdminBro = require('admin-bro');
const models = require('./models/index');


AdminBro.registerAdapter(require('admin-bro-sequelizejs'));

const adminBro = new AdminBro({
    resources: [
        { resource: models.User, options: { listProperties: ['firstName', 'lastName', 'email', 'phone', 'lockUntil'] } },
        { resource: models.Product, options: { listProperties: ['name', 'description', 'price', 'stockCount', 'discount'] } },
        models.Address,
        models.Comment,
        models.Rate,
        models.Purchase,
        models.PurchaseDetail,
        models.Image,
    ],
    rootPath: '/admin',
    branding: {
        logo: false,
        companyName: 'Online Store',
        softwareBrothers: false,
    }
});

module.exports = adminBro;