const { Worker } = require("bullmq");
const db = require("./src/models");
const sendEmail = require("./src/utils/mailer");
require("dotenv").config();

const connection = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

console.log("Starting email worker...");

const worker = new Worker(
  "email-queue",
  async (job) => {
    const bullJobId = job.id; // We expect this to be the DB id as a string or number
    const dbJobId = Number(bullJobId);
    const jobData = job.data;

    try {
      await db.EmailJobs.update(
        {
          status: "active",
        },
        {
          where: { id: dbJobId },
        }
      );

      await sendEmail(jobData.to_address, jobData.subject, jobData.body);

      await db.EmailJobs.update(
        {
          status: "completed",
          result: "Sent successfully",
        },
        {
          where: { id: dbJobId },
        }
      );

      console.log(`Email sent successfully to ${jobData.to_address}`);
    } catch (error) {
      console.error(`Failed to send email to ${jobData.to_address}:`, error.message);

      await db.EmailJobs.update(
        {
          status: "failed",
          error: error.message,
          attempts: job.attemptsMade,
        },
        { where: { id: dbJobId } }
      );
      throw error;
    }
  },
  { connection }
);

// Handle worker events
worker.on('completed', job => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});

worker.on('error', err => {
  console.error('Worker error:', err);
});

console.log("Email worker is running. Press Ctrl+C to stop."); 