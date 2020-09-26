
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const createError = require('http-errors');
const adminBro = require('./admin');
const helmet = require("helmet");
const fs = require('fs');
const csurf = require('csurf')

let RedisStore = require('connect-redis')(session);
const { redisClient } = require('./redis');
const adminRouter = require('./routes/admin');
const setupRouter = require('./routes');
require('./jobs');

const app = express();
app.disable("x-powered-by");

app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(adminBro.options.rootPath, adminRouter);
app.use(logger('dev'));
app.set('sessionMiddleware', session({
    secret: process.env.SESSION_SECRET,
    unset: 'destroy',
    store: new RedisStore({ client: redisClient }),
    sameSite: 'lax',
    resave:false,
    saveUninitialized:true
    })
);
app.use((...args)=> app.get('sessionMiddleware')(...args));
app.use((req, res, next)=>{
    if (!req.session) {
        return next(createError(500));
    }
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('client', 'build')));


if(process.env.NODE_ENV === "production"){
    app.use(csurf({
        cookie: {
            httpOnly: true,
        },
      })
    );
}

setupRouter(app);

if(process.env.NODE_ENV === "production"){
    app.get('/*', function(req, res) {
        fs.readFile(path.join(__dirname,'index.html'),'utf8',(err, data)=>{
            if(err){
                throw err;
            }
            data = data.replace('content=""',`content="${req.csrfToken()}"`)
            res.send(data);
        });
    });
}

app.use((err, req, res, next)=>{
    if (res.headersSent)
        return next(err);
    res.status(err.status || 500).send(err.message);
});

module.exports = app;
