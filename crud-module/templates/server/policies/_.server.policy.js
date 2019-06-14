'use strict';

/**
 * Invoke <%= humanizedPluralName %> Permissions
 */
exports.invokeRolesPolicies = function () {
  //
};

/**
 * Check If <%= humanizedPluralName %> Policy Allows
 */
exports.isAllowed = function (req, res, next) {

  if (!req.session.permissions.<%= slugifiedPluralName %>) {
    return res.status(403).json({
      message: '<%= humanizedPluralName %> is not authorized'
    });
  }

  if (!req.session.permissions.<%= slugifiedPluralName %>[req.method.toLowerCase()][req.route.path]) {
    return res.status(403).json({
      message: '<%= humanizedPluralName %> is not authorized'
    });
  }

  return next();

};
