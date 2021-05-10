const db = {
  'users': [
    { id: '1', name: 'Jose' },
    { id: '2', name: 'Jesus' },
  ],
};

const list = async (table) => {
  return db[table];
};

const get = async (table, id) => {
  let collection = await list(table);
  return collection.find(item => item.id === id) || null;
};

const upsert = async (table, data) => {
  if (!db[table]) {
    db[table] = [];
  }

  db[table].push(data);
};

const remove = async (table, id) => {
  return true;
};

const query = async (table, q) => {
  let collection = await list(table);
  let keys = Object.keys(q);
  let key = keys[0];
  return collection.find(item => item[key] === q[key]) || null;
}

module.exports = {
  list,
  get,
  upsert,
  query,
  remove,
};
