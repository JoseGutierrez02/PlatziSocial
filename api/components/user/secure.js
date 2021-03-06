const auth = require('../../../auth');

module.exports = checkAuth = (action) => {
  
  const middleware = (req, _res, next) => {
    switch(action) {
      case 'update':
        const ownerId = req.params.id;
        auth.check.own(req, ownerId);
        next();
        break;
      case 'follow':
        auth.check.logged(req);
        next();
        break;
      case 'delete':
        const id = req.params.id;
        auth.check.own(req, id);
        next();
        break;
      default:
        next();
    }
  };

  return middleware;
};