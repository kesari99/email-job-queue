const emailQueue = require("../config/queue");
const db = require("../models");


async function scheduleEmailJob(data){
    const job = await db.EmailJobs.create({
        to_address:data.to_address,
        subject:data.subject,
        body:data.body
    

    })


    // Create a new object without jobId in the data payload
    const jobData = {
        to_address: data.to_address,
        subject: data.subject,
        body: data.body
    };

    await emailQueue.add('send-email',jobData,{

        attempts:3,
        backoff: {
            type: 'exponential',
            delay: 5000
          },
          
    
    })

    return job.id
}

module.exports = scheduleEmailJob;