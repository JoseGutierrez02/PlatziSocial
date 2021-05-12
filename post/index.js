const express = require('express');
const config = require('../config');
const postRouter = require('./components/post/network');
const errors = require('../network/errors');
const app = express();

app.use(express.json());
// ROUTES
app.use('/api/post', postRouter);
app.use(errors);

app.listen(config.postService.port, () => {
  console.log(`Post service listening at http://localhost:${config.postService.port}`);
});
