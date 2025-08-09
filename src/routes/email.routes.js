const express = require('express')
const router = express.Router()
const controller = require('../controllers/email.controller')
const { clearEmailQueue } = require('../services/clearqueue.service');

router.post('/emails', controller.scheduleEmail);
router.get('/emails/:id', controller.getEmailStatus);
router.get('/emails', controller.listEmailJobs);
router.delete('/emails/clear', clearEmailQueue); 
module.exports = router;