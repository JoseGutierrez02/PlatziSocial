const express = require('express');
const config = require('../config');
const mysqlRouter = require('./network');
const app = express();

app.use(express.json());
//ROUTES
app.use('/', mysqlRouter);

app.listen(config.mysqlService.port, () => {
  console.log(`MySQL service listenning at http://localhost:${config.mysqlService.port}`);
});
