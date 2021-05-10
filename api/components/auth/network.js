const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index');

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  Controller.login(username, password)
    .then((token) => {
      response.success(req, res, token, 201);
    })
    .catch(next);
});

module.exports = router;
