const auth = require('../auth');
const TABLE = 'users';

module.exports = (injectedStore, injectedCache) => {
  let store = injectedStore;
  let cache = injectedCache;
  if (!store) {
    store = require('../../../store/dummy');
  }

  if (!cache) {
    cache = require('../../../store/dummy');
  }

  const list = async () => {
    let users = await cache.list(TABLE);

    if (!users) {
      console.log('It was not on cache, searching on database');
      users = await store.list(TABLE);
      cache.upsert(TABLE, users);
    } else {
      console.log('We got the data from cache');
    }

    return users;
  };

  const get = async (id) => {
    const users = await store.list(TABLE);
    let user = await cache.get(TABLE, id);

    if (!user) {
      console.log('It was not on cache, searching on database');
      user = await store.get(TABLE, id);
      cache.upsert(TABLE, users, id);
    } else {
      console.log('We got the data from cache');
    }
    return user;
  };

  const upsert = async (name, username, password, id) => {
    const user = {
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

    return store.upsert(TABLE, user, id);
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
