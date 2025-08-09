const db = require("../models");
const scheduleEmailJob  = require("../services/email.service");


exports.scheduleEmail = async (req, res) => {
  const { to_address, subject, body } = req.body;
  if (!to_address || !subject || !body) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const jobId = await scheduleEmailJob({ to_address, subject, body });
  res.status(201).json({ jobId });
};

exports.getEmailStatus = async (req, res) => {
  const job = await db.EmailJob.findByPk(req.params.id);
  if (!job) return res.status(404).json({ error: "Job not found" });

  res.json(job);
};

exports.listEmailJobs = async (req, res) => {
  const jobs = await db.EmailJob.findAll();
  res.json(jobs);
};
