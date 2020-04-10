const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const redis = require('redis');
const session = require('express-session');
const createError = require('http-errors')

dotenv.config();

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient({
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});

const authRouter = require('./routes/authentication');
const usersRouter = require('./routes/users');

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

app.use(authRouter);
app.use('/users', usersRouter);

app.use((req, res, next)=>{
    next(createError(404, 'Not Found'));
});

app.use((err, req, res, next)=>{
    if (res.headersSent)
        return next(err);
    res.status(err.status).send(err.message);
});

module.exports = app;
