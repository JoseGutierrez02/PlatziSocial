const auth = require('../auth');
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

  const upsert = async (id, name, username, password) => {
    const user = {
      id,
      name,
      username,
    };

    if (username || password) {
      await auth.upsert({
        id,
        username,
        password
      });
    }

    return store.upsert(TABLE, user);
  };

  return {
    list,
    get,
    upsert,
  };
};
