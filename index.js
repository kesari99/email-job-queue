const express = require('express');
const app = express();
const dotenv = require('dotenv');
const db = require('./src/models')
const emailRoutes = require('./src/routes/email.routes')

const port = process.env.PORT || 3001


dotenv.config()


app.use(express.json())
app.use('/api', emailRoutes);



db.sequelize.authenticate().then(() => {
    console.log('Postgres connected');
    app.listen(port, () => console.log(`Server running on ${port}`));
  });