// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const registerRoute = require('./routes/registerRoute');

const app = express();

app.use(bodyParser.json());
app.use(registerRoute);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
