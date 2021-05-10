const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const config = require('../config');
const userRouter = require('./components/user/network');
const app = express();

app.use(express.json());
// ROUTER
app.use('/api/user', userRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(config.api.port, () => {
  console.log(`Server listening at http://localhost:${config.api.port}`);
});
