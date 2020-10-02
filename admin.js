/**
 * @module admin
 * admin bro configuration
 */
const AdminBro = require('admin-bro');
const models = require('./models/index');


AdminBro.registerAdapter(require('admin-bro-sequelizejs'));

const productParent = {
    name: 'Products',
}

const userParent = {
    name: 'Users',
}

const purchaseParent = {
    name: 'Purchases',
}

const categoryParent = {
    name: 'Categories',
}

const adminBro = new AdminBro({
    resources: [
        {resource: models.Admin, options: {
            actions: {
                edit: {
                    isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'super',
                },
                delete: {
                    isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'super',
                },
                new: {
                    isAccessible: ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'super',
                },
            },
        }},
        { resource: models.User, options: { 
            listProperties: ['id','firstName', 'lastName', 'email', 'phone', 'lockUntil'], 
            editProperties: ['firstName', 'lastName', 'email', 'phone', 'lockUntil', 'verified'], 
            parent: userParent, } },
        { resource: models.Product, options: { 
            editProperties : ['name', 'description', 'price', 'DiscountId', 'SubcategoryName'],
            showProperties : ['id','name', 'description', 'price','SubcategoryName','rate'],
            parent: productParent,
        } 
        },
        {resource: models.Discount, options: { parent: productParent, } },
        {resource: models.Address, options: { parent: userParent, }},
        {resource: models.Purchase      , options: { parent: purchaseParent}, },
        {resource: models.PurchaseDetail, options: { parent: purchaseParent}, },
        {resource: models.Color, options: {
            parent: productParent,
            actions:{
                show:{
                    
                },
            },
        },},
        {resource: models.Shipment, options: { parent: purchaseParent}, },
        {resource: models.Category, options: {parent: categoryParent}},
        {resource: models.Subcategory, options: {parent: categoryParent}},
        {resource: models.EmailLink, options: {parent:userParent,}},
        { resource: models.UserRate, options: { parent: userParent, } },
        { resource: models.Refund, options: { parent: userParent, } },
    ],
    rootPath: '/admin',
    branding: {
        logo: false,
        companyName: 'Online Store',
        softwareBrothers: false,
    }
});

module.exports = adminBro;