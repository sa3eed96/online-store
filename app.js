const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const createError = require('http-errors');
const adminBro = require('./admin');

const dotenv = require('dotenv');
dotenv.config();

let RedisStore = require('connect-redis')(session);
const { getChannel }= require('./email/addToQueue');
getChannel();

const { redisClient } = require('./redis');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/authentication');
const productRouter = require('./routes/product');
const addressRouter = require('./routes/address');
const cartRouter = require('./routes/cart');
const purchaseRouter = require('./routes/purchase');
const userRouter = require('./routes/users');
const autoCompleteRouter = require('./routes/autocomplete');
const CategoryRouter = require('./routes/category');
const emailConfirmRouter = require('./routes/emailconfirm');
const passwordResetRouter = require('./routes/passwordreset');
const currencyRouter = require('./routes/currency');

const app = express();

app.use(adminBro.options.rootPath, adminRouter);
app.use(logger('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    unset: 'destroy',
    store: new RedisStore({ client: redisClient }),
    sameSite: 'lax'
}));
app.use((req, res, next)=>{
    if (!req.session) {
        return next(createError(500));
    }
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client', 'build')));

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

if(process.env.NODE_ENV == "production"){
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.use((err, req, res, next)=>{
    if (res.headersSent)
        return next(err);
    res.status(err.status || 500).send(err.message);
});

module.exports = app;
