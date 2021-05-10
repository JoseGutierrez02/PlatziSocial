const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const config = require('../config');
const userRouter = require('./components/user/network');
const authRouter = require('./components/auth/network');
const errors = require('../network/errors');
const app = express();

app.use(express.json());
// ROUTER
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(errors);

app.listen(config.api.port, () => {
  console.log(`Server listening at http://localhost:${config.api.port}`);
});
