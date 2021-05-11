const express = require('express');
const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');
const router = express.Router();

router.get('/', (req, res, next) => {
  Controller.list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Controller.get(id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

router.post('/', secure('insert'), (req, res, next) => {
  const { id: userId } = req.user;
  const { text } = req.body;

  Controller.upsert(userId, text)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
});

router.put('/:id', secure('update'), (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const { text } = req.body;

  Controller.upsert(userId, text, id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
});

router.delete('/:id', secure('delete'), (req, res, next) => {
  const { id } = req.params;

  Controller.remove(id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});


module.exports = router;
