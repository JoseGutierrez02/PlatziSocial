const TABLE = 'posts';

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

  const upsert = (user, text, id) => {
    const post = {
      text,
      user,
    };

    if (id) {
      post.id = id
    }

    return store.upsert(TABLE, post);
  };

  const remove = (id) => {
    return store.remove(TABLE, id);
  };

  return {
    list,
    get,
    upsert,
    remove,
  };
};
