'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * <%= classifiedSingularName %> Schema
 */
var <%= classifiedSingularName %>Schema = new Schema({<%- dataModelServer %>
  status: {
    type: Number,
    default: 1
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  modified: {
    type: Date,
    default: Date.now
  },
  modifiedby: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

<%= classifiedSingularName %>Schema.methods.castDataTypeByModel = function (params) {

  if (!params || typeof params == 'undefined') {
    return {};
  }

  if (typeof params == 'string') {
    params = JSON.parse(params);
  }

  if (typeof params != 'object') {
    return {};
  }

  if ( Object.keys(params).length == 0) {
    return {};
  }

  var moment = require('moment');

  for (var field in <%= classifiedSingularName %>Schema.paths) {

    if (params[field] === '' || params[field] === null) {
      delete params[field];
      continue;
    }

    if (field == 'modified' && params['modified']) {

      var date1 = moment(params[field]['begin'],'YYYY-MM-DD H:mm:ss');
      var date2 = moment(params[field]['end'],'YYYY-MM-DD H:mm:ss');

      params[field]={$gte:date1.toDate(),$lte:date2.toDate()}
    }

    if (field == 'created' && params['created']) {

      var date1 = moment(params[field]['begin'],'YYYY-MM-DD H:mm:ss');
      var date2 = moment(params[field]['end'],'YYYY-MM-DD H:mm:ss');

      params[field]={$gte:date1.toDate(),$lte:date2.toDate()}
    }

    if (field == 'user' && params['user._id']) {
      params['user'] = mongoose.Types.ObjectId(params['user._id']);
      delete params['user._id'];
    }

    if (field == 'modifiedby' && params['modifiedby._id']) {
      params['modifiedby'] = mongoose.Types.ObjectId(params['modifiedby._id']);
      delete params['modifiedby._id'];
    }
<%- dataModelServer2 %>
    if (!params[field]) {
      continue;
    }

    if (<%= classifiedSingularName %>Schema.paths[field].instance === 'Number') {
      params[field] = parseFloat(params[field], 10);
    }
  }
  return params;
};

<%= classifiedSingularName %>Schema.methods.processPopulate = function (params) {

  if (!params || typeof params == 'undefined') {
    return { path: '', field: '' };
  }

  if (typeof params == 'string') {
    params = JSON.parse(params);
  }

  if (typeof params != 'object') {
    return { path: '', field: '' };
  }

  if ( Object.keys(params).length == 0) {
    return { path: '', field: '' };
  }

  return params;
};

module.exports = mongoose.model('<%= classifiedSingularName %>', <%= classifiedSingularName %>Schema);
