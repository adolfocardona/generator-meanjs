'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  <%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  <%= camelizedSingularName %>;

/**
 * <%= humanizedSingularName %> routes tests
 */
describe('<%= humanizedSingularName %> CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose.connection.db);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new <%=camelizedSingularName %>
    user.save()
      .then(function () {
        <%=camelizedSingularName %> = {
          title: '<%= humanizedSingularName %> Title',
          content: '<%= humanizedSingularName %> Content'
        };

        done();
      })
      .catch(done);
  });

  it('should not be able to save an <%=camelizedSingularName %> if logged in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/<%=camelizedPluralName %>')
          .send(<%=camelizedSingularName %>)
          .expect(403)
          .end(function (<%=camelizedSingularName %>SaveErr, <%=camelizedSingularName %>SaveRes) {
            // Call the assertion callback
            done(<%=camelizedSingularName %>SaveErr);
          });

      });
  });

  it('should not be able to save an <%=camelizedSingularName %> if not logged in', function (done) {
    agent.post('/api/<%=camelizedPluralName %>')
      .send(<%=camelizedSingularName %>)
      .expect(403)
      .end(function (<%=camelizedSingularName %>SaveErr, <%=camelizedSingularName %>SaveRes) {
        // Call the assertion callback
        done(<%=camelizedSingularName %>SaveErr);
      });
  });

  it('should not be able to update an <%=camelizedSingularName %> if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/<%=camelizedPluralName %>')
          .send(<%=camelizedSingularName %>)
          .expect(403)
          .end(function (<%=camelizedSingularName %>SaveErr, <%=camelizedSingularName %>SaveRes) {
            // Call the assertion callback
            done(<%=camelizedSingularName %>SaveErr);
          });
      });
  });

  it('should be able to get a list of <%=camelizedPluralName %> if not signed in', function (done) {
    // Create new <%=camelizedSingularName %> model instance
    var <%=camelizedSingularName %>Obj = new <%= humanizedSingularName %>(<%=camelizedSingularName %>);

    // Save the <%=camelizedSingularName %>
    <%=camelizedSingularName %>Obj.save(function () {
      // Request <%=camelizedPluralName %>
      agent.get('/api/<%=camelizedPluralName %>')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single <%=camelizedSingularName %> if not signed in', function (done) {
    // Create new <%=camelizedSingularName %> model instance
    var <%=camelizedSingularName %>Obj = new <%= humanizedSingularName %>(<%=camelizedSingularName %>);

    // Save the <%=camelizedSingularName %>
    <%=camelizedSingularName %>Obj.save(function () {
      agent.get('/api/<%=camelizedPluralName %>/' + <%=camelizedSingularName %>Obj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', <%=camelizedSingularName %>.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single <%=camelizedSingularName %> with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    agent.get('/api/<%=camelizedPluralName %>/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', '<%= humanizedSingularName %> is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single <%=camelizedSingularName %> which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent <%=camelizedSingularName %>
    agent.get('/api/<%=camelizedPluralName %>/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No <%=camelizedSingularName %> with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should not be able to delete an <%=camelizedSingularName %> if signed in without the "admin" role', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        agent.post('/api/<%=camelizedPluralName %>')
          .send(<%=camelizedSingularName %>)
          .expect(403)
          .end(function (<%=camelizedSingularName %>SaveErr, <%=camelizedSingularName %>SaveRes) {
            // Call the assertion callback
            done(<%=camelizedSingularName %>SaveErr);
          });
      });
  });

  it('should not be able to delete an <%=camelizedSingularName %> if not signed in', function (done) {
    // Set <%=camelizedSingularName %> user
    <%=camelizedSingularName %>.user = user;

    // Create new <%=camelizedSingularName %> model instance
    var <%=camelizedSingularName %>Obj = new <%= humanizedSingularName %>(<%=camelizedSingularName %>);

    // Save the <%=camelizedSingularName %>
    <%=camelizedSingularName %>Obj.save(function () {
      // Try deleting <%=camelizedSingularName %>
      agent.delete('/api/<%=camelizedPluralName %>/' + <%=camelizedSingularName %>Obj._id)
        .expect(403)
        .end(function (<%=camelizedSingularName %>DeleteErr, <%=camelizedSingularName %>DeleteRes) {
          // Set message assertion
          (<%=camelizedSingularName %>DeleteRes.body.message).should.match('User is not authorized');

          // Handle <%=camelizedSingularName %> error error
          done(<%=camelizedSingularName %>DeleteErr);
        });

    });
  });

  it('should be able to get a single <%=camelizedSingularName %> that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      usernameOrEmail: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin']
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new <%=camelizedSingularName %>
          agent.post('/api/<%=camelizedPluralName %>')
            .send(<%=camelizedSingularName %>)
            .expect(200)
            .end(function (<%=camelizedSingularName %>SaveErr, <%=camelizedSingularName %>SaveRes) {
              // Handle <%=camelizedSingularName %> save error
              if (<%=camelizedSingularName %>SaveErr) {
                return done(<%=camelizedSingularName %>SaveErr);
              }

              // Set assertions on new <%=camelizedSingularName %>
              (<%=camelizedSingularName %>SaveRes.body.title).should.equal(<%=camelizedSingularName %>.title);
              should.exist(<%=camelizedSingularName %>SaveRes.body.user);
              should.equal(<%=camelizedSingularName %>SaveRes.body.user._id, orphanId);

              // force the <%=camelizedSingularName %> to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the <%=camelizedSingularName %>
                    agent.get('/api/<%=camelizedPluralName %>/' + <%=camelizedSingularName %>SaveRes.body._id)
                      .expect(200)
                      .end(function (<%=camelizedSingularName %>InfoErr, <%=camelizedSingularName %>InfoRes) {
                        // Handle <%=camelizedSingularName %> error
                        if (<%=camelizedSingularName %>InfoErr) {
                          return done(<%=camelizedSingularName %>InfoErr);
                        }

                        // Set assertions
                        (<%=camelizedSingularName %>InfoRes.body._id).should.equal(<%=camelizedSingularName %>SaveRes.body._id);
                        (<%=camelizedSingularName %>InfoRes.body.title).should.equal(<%=camelizedSingularName %>.title);
                        should.equal(<%=camelizedSingularName %>InfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to get a single <%=camelizedSingularName %> if not signed in and verify the custom "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create new <%=camelizedSingularName %> model instance
    var <%=camelizedSingularName %>Obj = new <%= humanizedSingularName %>(<%=camelizedSingularName %>);

    // Save the <%=camelizedSingularName %>
    <%=camelizedSingularName %>Obj.save(function (err) {
      if (err) {
        return done(err);
      }
      agent.get('/api/<%=camelizedPluralName %>/' + <%=camelizedSingularName %>Obj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', <%=camelizedSingularName %>.title);
          // Assert the custom field "isCurrentUserOwner" is set to false for the un-authenticated User
          res.body.should.be.instanceof(Object).and.have.property('isCurrentUserOwner', false);
          // Call the assertion callback
          done();
        });
    });
  });

  it('should be able to get single <%=camelizedSingularName %>, that a different user created, if logged in & verify the "isCurrentUserOwner" field is set to "false"', function (done) {
    // Create temporary user creds
    var _creds = {
      usernameOrEmail: '<%=camelizedSingularName %>owner',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create user that will create the <%= humanizedSingularName %>
    var _<%=camelizedSingularName %>Owner = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'temp@test.com',
      username: _creds.usernameOrEmail,
      password: _creds.password,
      provider: 'local',
      roles: ['admin', 'user']
    });

    _<%=camelizedSingularName %>Owner.save(function (err, _user) {
      // Handle save error
      if (err) {
        return done(err);
      }

      // Sign in with the user that will create the <%= humanizedSingularName %>
      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var userId = _user._id;

          // Save a new <%=camelizedSingularName %>
          agent.post('/api/<%=camelizedPluralName %>')
            .send(<%=camelizedSingularName %>)
            .expect(200)
            .end(function (<%=camelizedSingularName %>SaveErr, <%=camelizedSingularName %>SaveRes) {
              // Handle <%=camelizedSingularName %> save error
              if (<%=camelizedSingularName %>SaveErr) {
                return done(<%=camelizedSingularName %>SaveErr);
              }

              // Set assertions on new <%=camelizedSingularName %>
              (<%=camelizedSingularName %>SaveRes.body.title).should.equal(<%=camelizedSingularName %>.title);
              should.exist(<%=camelizedSingularName %>SaveRes.body.user);
              should.equal(<%=camelizedSingularName %>SaveRes.body.user._id, userId);

              // now signin with the test suite user
              agent.post('/api/auth/signin')
                .send(credentials)
                .expect(200)
                .end(function (err, res) {
                  // Handle signin error
                  if (err) {
                    return done(err);
                  }

                  // Get the <%=camelizedSingularName %>
                  agent.get('/api/<%=camelizedPluralName %>/' + <%=camelizedSingularName %>SaveRes.body._id)
                    .expect(200)
                    .end(function (<%=camelizedSingularName %>InfoErr, <%=camelizedSingularName %>InfoRes) {
                      // Handle <%=camelizedSingularName %> error
                      if (<%=camelizedSingularName %>InfoErr) {
                        return done(<%=camelizedSingularName %>InfoErr);
                      }

                      // Set assertions
                      (<%=camelizedSingularName %>InfoRes.body._id).should.equal(<%=camelizedSingularName %>SaveRes.body._id);
                      (<%=camelizedSingularName %>InfoRes.body.title).should.equal(<%=camelizedSingularName %>.title);
                      // Assert that the custom field "isCurrentUserOwner" is set to false since the current User didn't create it
                      (<%=camelizedSingularName %>InfoRes.body.isCurrentUserOwner).should.equal(false);

                      // Call the assertion callback
                      done();
                    });
                });
            });
        });
    });
  });

  afterEach(function (done) {
    <%= humanizedSingularName %>.remove().exec()
      .then(User.remove().exec())
      .then(done())
      .catch(done);
  });
});
