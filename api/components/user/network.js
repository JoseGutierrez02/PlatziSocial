const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

router.get('/', (req, res) => {
  Controller.list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Controller.get(id)
  .then((data) => {
    response.success(req, res, data, 200);
  })
  .catch((err) => {
    response.error(req, res, err.message, 500);
  });
});

router.post('/', (req, res) => {
  const { id, name } = req.body;

  Controller.upsert(id, name)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((err) => {
      response.error(req, res, err.message, 400);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  Controller.upsert(id, name)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((err) => {
      response.error(req, res, err.message, 400);
    });
});

module.exports = router;
