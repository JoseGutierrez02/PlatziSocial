const TABLE = 'users';

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  const list = () => {
    return store.list(TABLE);
  };

  const get = (id) => {
    return store.get(TABLE, id);
  };

  const upsert = (id, name) => {
    const user = {
      id,
      name,
    };

    return store.upsert(TABLE, user);
  };

  return {
    list,
    get,
    upsert,
  };
};
