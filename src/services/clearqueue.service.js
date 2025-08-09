const emailQueue = require('../config/queue'); 

exports.clearEmailQueue = async (req, res) => {
  try {
    await emailQueue.obliterate({ force: true }); 
    return res.status(200).json({ message: 'Email queue cleared successfully' });
  } catch (error) {
    console.error('Error clearing queue:', error);
    return res.status(500).json({ error: 'Failed to clear queue' });
  }
};