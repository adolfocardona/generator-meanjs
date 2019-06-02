'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  <%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an <%= camelizedSingularName %>
 */
exports.create = function (req, res) {
  var <%= camelizedSingularName %> = new <%= classifiedSingularName %>(req.body);
  <%= camelizedSingularName %>.user = req.user;

  <%= camelizedSingularName %>.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(<%= camelizedSingularName %>);
    }
  });
};

/**
 * Show the current <%= camelizedSingularName %>
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %> ? req.<%= camelizedSingularName %>.toJSON() : {};

  // Add a custom field to the <%= camelizedSingularName %>, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the <%= camelizedSingularName %> model.
  <%= camelizedSingularName %>.isCurrentUserOwner = !!(req.user && <%= camelizedSingularName %>.user && <%= camelizedSingularName %>.user._id.toString() === req.user._id.toString());

  res.json(<%= camelizedSingularName %>);
};

/**
 * Update an <%= camelizedSingularName %>
 */
exports.update = function (req, res) {
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %>;

  <%= camelizedSingularName %>.title = req.body.title;
  <%= camelizedSingularName %>.content = req.body.content;

  <%= camelizedSingularName %>.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(<%= camelizedSingularName %>);
    }
  });
};

/**
 * Delete an <%= camelizedSingularName %>
 */
exports.delete = function (req, res) {
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %>;

  <%= camelizedSingularName %>.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(<%= camelizedSingularName %>);
    }
  });
};

/**
 * List of <%= humanizedPluralName %>
 */
exports.list = function (req, res) {
  <%= classifiedSingularName %>.find().sort('-created').populate('user', 'displayName').exec(function (err, <%= camelizedPluralName %>) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(<%= camelizedPluralName %>);
    }
  });
};

/**
 * <%= humanizedSingularName %> middleware
 */
exports.<%= camelizedSingularName %>ByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: '<%= humanizedSingularName %> is invalid'
    });
  }

  <%= classifiedSingularName %>.findById(id).populate('user', 'displayName').exec(function (err, <%= camelizedSingularName %>) {
    if (err) {
      return next(err);
    } else if (!<%= camelizedSingularName %>) {
      return res.status(404).send({
        message: 'No <%= camelizedSingularName %> with that identifier has been found'
      });
    }
    req.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
    next();
  });
};
