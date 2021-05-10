const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./index');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Controller.login(username, password)
    .then((token) => {
      response.success(req, res, token, 201);
    })
    .catch((err) => {
      response.error(req, res, 'Invalid information', 400);
    });
});

module.exports = router;
