'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  <%= classifiedSingularName %> = mongoose.model('<%= humanizedSingularName %>'),
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
describe('<%= humanizedSingularName %> Admin CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose);
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
      roles: ['user', 'admin'],
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new <%= camelizedSingularName %>
    user.save()
      .then(function () {
        <%= camelizedSingularName %> = {
          title: '<%= humanizedSingularName %> Name',
          content: '<%= humanizedSingularName %> Status'
        };

        done();
      })
      .catch(done);
  });

  it('should be able to save an <%= camelizedSingularName %> if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= camelizedSingularName %>
        agent.post('/api/<%= camelizedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(200)
          .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Handle <%= camelizedSingularName %> save error
            if (<%= camelizedSingularName %>SaveErr) {
              return done(<%= camelizedSingularName %>SaveErr);
            }

            // Get a list of <%= camelizedPluralName %>
            agent.get('/api/<%= camelizedPluralName %>')
              .end(function (<%= camelizedPluralName %>GetErr, <%= camelizedPluralName %>GetRes) {
                // Handle <%= camelizedSingularName %> save error
                if (<%= camelizedPluralName %>GetErr) {
                  return done(<%= camelizedPluralName %>GetErr);
                }

                // Get <%= camelizedPluralName %> list
                var <%= camelizedPluralName %> = <%= camelizedPluralName %>GetRes.body;

                // Set assertions
                (<%= camelizedPluralName %>[0].user._id).should.equal(userId);
                (<%= camelizedPluralName %>[0].name).should.match('<%= humanizedSingularName %> Name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an <%= camelizedSingularName %> if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= camelizedSingularName %>
        agent.post('/api/<%= camelizedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(200)
          .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Handle <%= camelizedSingularName %> save error
            if (<%= camelizedSingularName %>SaveErr) {
              return done(<%= camelizedSingularName %>SaveErr);
            }

            // Update <%= camelizedSingularName %> Name
            <%= camelizedSingularName %>.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing <%= camelizedSingularName %>
            agent.put('/api/<%= camelizedPluralName %>/' + <%= camelizedSingularName %>SaveRes.body._id)
              .send(<%= camelizedSingularName %>)
              .expect(200)
              .end(function (<%= camelizedSingularName %>UpdateErr, <%= camelizedSingularName %>UpdateRes) {
                // Handle <%= camelizedSingularName %> update error
                if (<%= camelizedSingularName %>UpdateErr) {
                  return done(<%= camelizedSingularName %>UpdateErr);
                }

                // Set assertions
                (<%= camelizedSingularName %>UpdateRes.body._id).should.equal(<%= camelizedSingularName %>SaveRes.body._id);
                (<%= camelizedSingularName %>UpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an <%= camelizedSingularName %> if no name is provided', function (done) {
    // Invalidate name field
    <%= camelizedSingularName %>.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= camelizedSingularName %>
        agent.post('/api/<%= camelizedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(422)
          .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Set message assertion
            (<%= camelizedSingularName %>SaveRes.body.message).should.match('Name cannot be blank');

            // Handle <%= camelizedSingularName %> save error
            done(<%= camelizedSingularName %>SaveErr);
          });
      });
  });

  it('should be able to delete an <%= camelizedSingularName %> if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= camelizedSingularName %>
        agent.post('/api/<%= camelizedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(200)
          .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Handle <%= camelizedSingularName %> save error
            if (<%= camelizedSingularName %>SaveErr) {
              return done(<%= camelizedSingularName %>SaveErr);
            }

            // Delete an existing <%= camelizedSingularName %>
            agent.delete('/api/<%= camelizedPluralName %>/' + <%= camelizedSingularName %>SaveRes.body._id)
              .send(<%= camelizedSingularName %>)
              .expect(200)
              .end(function (<%= camelizedSingularName %>DeleteErr, <%= camelizedSingularName %>DeleteRes) {
                // Handle <%= camelizedSingularName %> error error
                if (<%= camelizedSingularName %>DeleteErr) {
                  return done(<%= camelizedSingularName %>DeleteErr);
                }

                // Set assertions
                (<%= camelizedSingularName %>DeleteRes.body._id).should.equal(<%= camelizedSingularName %>SaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single <%= camelizedSingularName %> if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new <%= camelizedSingularName %> model instance
    <%= camelizedSingularName %>.user = user;
    var <%= camelizedSingularName %>Obj = new <%= classifiedSingularName %>(<%= camelizedSingularName %>);

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new <%= camelizedSingularName %>
        agent.post('/api/<%= camelizedPluralName %>')
          .send(<%= camelizedSingularName %>)
          .expect(200)
          .end(function (<%= camelizedSingularName %>SaveErr, <%= camelizedSingularName %>SaveRes) {
            // Handle <%= camelizedSingularName %> save error
            if (<%= camelizedSingularName %>SaveErr) {
              return done(<%= camelizedSingularName %>SaveErr);
            }

            // Get the <%= camelizedSingularName %>
            agent.get('/api/<%= camelizedPluralName %>/' + <%= camelizedSingularName %>SaveRes.body._id)
              .expect(200)
              .end(function (<%= camelizedSingularName %>InfoErr, <%= camelizedSingularName %>InfoRes) {
                // Handle <%= camelizedSingularName %> error
                if (<%= camelizedSingularName %>InfoErr) {
                  return done(<%= camelizedSingularName %>InfoErr);
                }

                // Set assertions
                (<%= camelizedSingularName %>InfoRes.body._id).should.equal(<%= camelizedSingularName %>SaveRes.body._id);
                (<%= camelizedSingularName %>InfoRes.body.name).should.equal(<%= camelizedSingularName %>.name);

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (<%= camelizedSingularName %>InfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    <%= classifiedSingularName %>.remove().exec()
      .then(User.remove().exec())
      .then(done())
      .catch(done);
  });
});
