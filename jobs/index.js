const Queue = require('bull');
const path = require('path');

const discountQueue = new Queue('discountDelete',{redis: {
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    }
});

discountQueue.process(path.join('jobs','discount.js'));

discountQueue.add({},{
    repeat:{
        cron: '00***',
    },
});