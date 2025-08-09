const { Queue } = require("bullmq");
require('dotenv').config();


const emailQueue = new Queue('email-queue', {
    connection : {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})


module.exports = emailQueue;