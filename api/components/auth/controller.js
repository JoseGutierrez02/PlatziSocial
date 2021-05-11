const auth = require('../../../auth');
const bcryptjs = require('bcryptjs');
const TABLE = 'auth';

module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) {
    store = require('../../../store/dummy');
  }

  const login = async (username, password) => {
    const data = await store.query(TABLE, { username: username });
    const areEqual = await bcryptjs.compare(password, data.password);

    if (areEqual) {
      // Generate token
      return auth.sign(data);
    } else {
      throw new Error('Invalid information');
    }
  }

  const upsert = async (data) => {
    const authData = {};

    if (data.id) {
      authData.id = data.id;
    }

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcryptjs.hash(data.password, 5);
    }

    store.upsert(TABLE, authData);
  };

  return {
    upsert,
    login,
  }
};
