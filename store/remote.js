const request = require('request');

function createRemoteDB(host, port) {
  const URL = `http://${host}:${port}`;

  const list = (table) => {
    return req('GET', table);
  };

  const get = (table, id) => {
    return req('GET', table, null, id);
  };

  const upsert = (table, data, id) => {
    if (id) {
      return req('PUT', table, data, id);
    } else {
      return req('POST', table, data);
    }
  };

  const query = (table, query, join) => {
    const data = {
      query,
      join,
    };
    return req('POST', `${table}/query`, data);
  };
  
  const remove = (table, id) => {
    return req('DELETE', table, null, id);
  };

  const req = (method, table, data, id) => {
    let url = `${URL}/${table}`;
    let body = '';

    if (data) {
      body = JSON.stringify(data);
    }

    if (id) {
      url = `${URL}/${table}/${id}`;
    }

    return new Promise((resolve, reject) => {
      request({
        method,
        headers: {
          'content-type': 'application/json',
        },
        url,
        body,
      }, (err, req, body) => {
        if (err) {
          console.error('Remote database error');
          return reject(err.message);
        }

        const resp = JSON.parse(body);
        return resolve(resp.body);
      });
    });
  };

  return {
    list,
    get,
    upsert,
    query,
    remove,
  }
}

module.exports = createRemoteDB;
