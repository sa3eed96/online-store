const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const createError = require('http-errors');
const adminBro = require('./admin');

dotenv.config();

let RedisStore = require('connect-redis')(session);


const { redisClient } = require('./redis');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/authentication');
const productRouter = require('./routes/product');
const addressRouter = require('./routes/address');
const cartRouter = require('./routes/cart');
const purchaseRouter = require('./routes/purchase');

const app = express();

app.use(logger('dev'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    unset: 'destroy',
    store: new RedisStore({ client: redisClient }),
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
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminBro.options.rootPath, adminRouter);
app.use('/api', authRouter);
app.use('/api/product', productRouter);
app.use('/api/address', addressRouter);
app.use('/api/cart', cartRouter);
app.use('/api/purchase', purchaseRouter);

app.use((req, res, next)=>{
    next(createError(404, 'Not Found'));
});

app.use((err, req, res, next)=>{
    if (res.headersSent)
        return next(err);
    res.status(err.status || 500).send(err.message);
});

module.exports = app;
