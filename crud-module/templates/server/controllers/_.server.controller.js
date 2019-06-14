'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  <%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>'),
  // Parent = mongoose.model('Parent'),
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

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  <%= camelizedSingularName %>.isCurrentUserOwner = !!(req.user && <%= camelizedSingularName %>.user && <%= camelizedSingularName %>.user._id.toString() === req.user._id.toString());

  res.json(<%= camelizedSingularName %>);
};

/**
 * Update an <%= camelizedSingularName %>
 */
exports.update = function (req, res) {
  var <%= camelizedSingularName %> = req.<%= camelizedSingularName %>;
  <%- dataServerController %>
  <%= camelizedSingularName %>.status = req.body.status;
  <%= camelizedSingularName %>.modifiedby = req.user._id;
  <%= camelizedSingularName %>.modified = Date();

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

  /*
  Parent.find({ <%= camelizedSingularName %>_id: <%= camelizedSingularName %>._id }).exec(function (err, rst) {

    if (rst.length > 0) {
      return res.json({ error: true });
    }

    <%= camelizedSingularName %>.remove(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(<%= camelizedSingularName %>);
      }
    });
  });
  */
};

/**
 * List of <%= humanizedPluralName %>
 */
exports.list = function (req, res) {

  var count = req.query.pageSize || 100;
  var page = req.query.pageNumber || 1;
  var populate = req.query.populate || { path: '', field: '' };
  var filter = req.query.filter || {};

  var processFilter = new <%= classifiedSingularName %>().castDataTypeByModel(filter);
  var processPopulate = new <%= classifiedSingularName %>().processPopulate(populate);

  if (req.user.roles.indexOf("admin") == -1) {
    processFilter.user = req.user._id;
  }

  var options = {
    filters : {
      field : req.query.field || '',
      mandatory : {
        contains : processFilter
      }
    },
    sort : req.query.sort || '-modified',
    start : (page - 1) * count,
    count : count
  };

  <%= classifiedSingularName %>.find().populate(processPopulate.path, processPopulate.field).field(options).keyword(options).filter(options).order(options).page(options, function (err, <%= camelizedPluralName %>) {
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

  <%= classifiedSingularName %>.findById(id).populate('user<%- dataServerController3 %>', 'displayName<%- dataServerController4 %>').exec(function (err, <%= camelizedSingularName %>) {
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

/**
 * Find All <%= humanizedPluralName %>
 */
exports.findAll = function (req, res) {

  var populate = req.query.populate || { path: '', field: '' };
  var field = req.query.field || '';  
  var sort = req.query.sort || '-modified';
  var filter = req.query.filter || {};

  var processFilter = new <%= classifiedSingularName %>().castDataTypeByModel(filter);
  var processPopulate = new <%= classifiedSingularName %>().processPopulate(populate);

  if (req.user.roles.indexOf("admin") == -1) {
    processFilter.user = req.user._id;
  }

  <%= classifiedSingularName %>.find(processFilter).sort(sort).populate(processPopulate.path, processPopulate.field).select(field).exec(function (err, <%= camelizedPluralName %>) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(<%= camelizedPluralName %>);
    }
  });
};
