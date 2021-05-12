const mysql = require('mysql');
const config = require('../config');

const dbConf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

const handleCon = () => {
  connection = mysql.createConnection(dbConf);

  connection.connect((err) => {
    if (err) {
      console.error('[db error]', err);
      setTimeout(handleCon, 2000);
    } else {
      console.log('[db] connected successfully');
    }
  });

  connection.on('error', (err) => {
    console.error('[db error]', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleCon();
    } else {
      throw err;
    }
  });
};

handleCon();

const list = (table) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const get = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const insert = (table, data) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const update = (table, data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const upsert = (table, data, id) => {
  if (data && id) {
    return update(table, data, id);
  } else {
    return insert(table, data);
  }
};

const query = (table, query, join) => {
  let joinQuery = '';
  if (join) {
    const key = Object.keys(join)[0];
    const value = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${value} = ${key}.id`;
  }

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
      if (err) return reject(err);
      (joinQuery) ? resolve(res || null) : resolve(res[0] || null);
    });
  });
};

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${table} WHERE id=${id}`, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  list,
  get,
  upsert,
  query,
  remove,
};
