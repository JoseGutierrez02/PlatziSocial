const express = require('express');
const router = express.Router();
const response = require('../network/response');
const Store = require('../store/mysql');

router.get('/:table', async (req, res, next) => {
  const { table } = req.params;
  const data = await Store.list(table);
  response.success(req, res, data, 200);
});

router.get('/:table/:id', async (req, res, next) => {
  const { table, id } = req.params;
  const data = await Store.get(table, id);
  response.success(req, res, data, 200);
});

router.post('/:table', async (req, res, next) => {
  const { table } = req.params;
  const { body } = req
  const data = await Store.upsert(table, body);
  response.success(req, res, data, 201);
});

router.put('/:table/:id', async (req, res, next) => {
  const { table, id } = req.params;
  const { body } = req;
  const data = await Store.upsert(table, body, id);
  response.success(req, res, data, 200);
});

router.post('/:table/query', async (req, res, next) => {
  const{ table } = req.params;
  const { query, join } = req.body;
  const data = await Store.query(table, query, join);
  response.success(req, res, data, 200);
});

router.delete('/:table/:id', async (req, res, next) => {
  const { table, id } = req.params;
  const data = await Store.remove(table, id);
  response.success(req, res, data, 200);
});

module.exports = router;
