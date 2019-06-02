'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

/**
 * <%= humanizedSingularName %> Schema
 */
var <%= classifiedSingularName %>Schema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

<%= classifiedSingularName %>Schema.statics.seed = seed;

mongoose.model('<%= classifiedSingularName %>', <%= classifiedSingularName %>Schema);

/**
* Seeds the User collection with document (<%= humanizedSingularName %>)
* and provided options.
*/
function seed(doc, options) {
  var <%= humanizedSingularName %> = mongoose.model('<%= humanizedSingularName %>');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(findAdminUser)
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function findAdminUser(skip) {
      var User = mongoose.model('User');

      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve(true);
        }

        User
          .findOne({
            roles: { $in: ['admin'] }
          })
          .exec(function (err, admin) {
            if (err) {
              return reject(err);
            }

            doc.user = admin;

            return resolve();
          });
      });
    }

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        <%= humanizedSingularName %>
          .findOne({
            title: doc.title
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove <%= humanizedSingularName %> (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {
        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: <%= humanizedSingularName %>\t' + doc.title + ' skipped')
          });
        }

        var <%= camelizedSingularName %> = new <%= humanizedSingularName %>(doc);

        <%= camelizedSingularName %>.save(function (err) {
          if (err) {
            return reject(err);
          }

          return resolve({
            message: 'Database Seeding: <%= humanizedSingularName %>\t' + <%= camelizedSingularName %>.title + ' added'
          });
        });
      });
    }
  });
}
