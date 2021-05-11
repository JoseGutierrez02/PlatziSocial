const auth = require('../../../auth');

module.exports = checkAuth = (action) => {

  const middleware = (req, res, next) => {
    switch(action) {
      case 'insert':
        auth.check.logged(req);
        next();
        break;
      case 'update':
        auth.check.logged(req);
        next();
        break;
      case 'delete':
        auth.check.logged(req);
        next();
        break;
      default:
        next();
    }
  };

  return middleware;
};
