'use strict';

var mongoose = require('mongoose'),
  Log = mongoose.model('Log');

/**
 * Invoke <%= humanizedPluralName %> Permissions
 */
exports.invokeRolesPolicies = function () {
};

/**
 * Check If <%= humanizedPluralName %> Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  //var roles = (req.user) ? req.user.roles : ['guest'];

  if (req.session.permissions == null) {
    return res.status(403).json({
      message: '<%= humanizedPluralName %> is not authorized'
    });
  }
  
  if (!req.session.permissions.<%= camelizedPluralName %>) {
    return res.status(403).json({
      message: '<%= humanizedPluralName %> is not authorized'
    });
  }

  if (!req.session.permissions.<%= camelizedPluralName %>[req.method.toLowerCase()]) {
    return res.status(403).json({
      message: '<%= humanizedPluralName %> is not authorized'
    });
  }

  if (!req.session.permissions.<%= camelizedPluralName %>[req.method.toLowerCase()][req.route.path]) {
    return res.status(403).json({
      message: '<%= humanizedPluralName %> is not authorized'
    });
  }

  return next();
};

/**
 * Save log http
 */
exports.logHttp = function (req, res, next) {

  var log        = new Log();
  log.host       = req.headers.host;
  log.user_agent = req.headers['user-agent'];
  log.method     = req.method;
  log.url        = req.url;
  log.ip         = req.clientIp;
  log.headers    = JSON.stringify(req.headers);
  log.params     = JSON.stringify(req.params);
  log.query      = JSON.stringify(req.query);
  log.body       = JSON.stringify(req.body);
  if (req.user != undefined) {
    log.user = mongoose.Types.ObjectId(req.user._id);
  }

  // Then save the user
  log.save(function (err) {
    if (err) {
      console.log(err);
    } else {
    }
  });

  return next();
};
