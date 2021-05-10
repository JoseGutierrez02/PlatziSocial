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
  return db[table].push(data);
};

const remove = async (table, id) => {
  return true;
};

module.exports = {
  list,
  get,
  upsert,
  remove,
};
