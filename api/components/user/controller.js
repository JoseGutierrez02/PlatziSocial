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

  const upsert = async (name, username, password, id) => {
    const user = {
      name,
      username,
    };

    if (id) {
      user.id = id;
    }

    if (username || password) {
      await auth.upsert({
        id,
        username,
        password
      });
    }

    return store.upsert(TABLE, user);
  };

  const follow = (from, to) => {
    const followData = {
      user_from: String(from),
      user_to: to
    };

    return store.upsert(`user_follow`, followData);
  };

  const following = (id) => {
    const join = {};
    join[TABLE] = 'user_to';
    const query = { user_from: id };
    return store.query('user_follow', query, join);
  };

  const remove = (id) => {
    auth.remove(id);
    return store.remove(TABLE, id);
  };

  return {
    list,
    get,
    upsert,
    follow,
    following,
    remove,
  };
};
