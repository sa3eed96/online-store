const authRouter = require('./authentication');
const productRouter = require('./product');
const addressRouter = require('./address');
const cartRouter = require('./cart');
const purchaseRouter = require('./purchase');
const userRouter = require('./users');
const autoCompleteRouter = require('./autocomplete');
const CategoryRouter = require('./category');
const emailConfirmRouter = require('./emailconfirm');
const passwordResetRouter = require('./passwordreset');
const currencyRouter = require('./currency');


const setupRouter = (app)=>{
    
    app.use('/api', authRouter);
    app.use('/api/product', productRouter);
    app.use('/api/address', addressRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/purchase', purchaseRouter);
    app.use('/api/user', userRouter);
    app.use('/api/autocomplete', autoCompleteRouter);
    app.use('/api/category', CategoryRouter);
    app.use('/api/verify', emailConfirmRouter);
    app.use('/api/passwordreset', passwordResetRouter);
    app.use('/api/currency', currencyRouter);
    app.use('/api/*', (req, res, next)=>{
        next(createError(404, 'Not Found'));
    });
    
}

module.exports = setupRouter;