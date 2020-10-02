/**
 * initialize jobs queues
 * @module jobs/index
 */

const Queue = require('bull');
const path = require('path');

/**
 * initialize new queue to handle discount expiration dates
 */
const discountQueue = new Queue('discountDelete',{redis: {
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    }
});

/**
 * initialize new queue to handle email sending jobs
 */
const mailQueue = new Queue('mailSend',{redis: {
    host: process.env.REDIS_ENDPOINT,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    }
});

discountQueue.process(path.join(__dirname,'discount.js'));
mailQueue.process(path.join(__dirname,'mail.js'));

/**
 * cron job to be repeated everyday
 */
discountQueue.add({},{
    repeat:{
        cron: '0 0 0/24 * * *',
    },
});

module.exports = {
    discountQueue,
    mailQueue
};