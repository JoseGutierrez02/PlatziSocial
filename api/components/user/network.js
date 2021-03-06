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

router.post('/', (req, res, next) => {
  const { name, username, password } = req.body;

  Controller.upsert(name, username, password)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
});

router.post('/follow/:id', secure('follow'), (req, res, next) => {
  const { id: userFrom } = req.user;
  const { id: userTo } = req.params;

  Controller.follow(userFrom, userTo)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
});

router.get('/:id/following', (req, res, next) => {
  const { id } = req.params

  Controller.following(id)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
});

router.put('/:id', secure('update'), (req, res, next) => {
  const { id } = req.params;
  const { name, username, password } = req.body;

  Controller.upsert(name, username, password, id)
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
