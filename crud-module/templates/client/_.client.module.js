(function (app) {
  'use strict';

  app.registerModule('<%= slugifiedPluralName %>', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('<%= slugifiedPluralName %>.admin', ['core.admin']);
  app.registerModule('<%= slugifiedPluralName %>.admin.routes', ['core.admin.routes']);
  app.registerModule('<%= slugifiedPluralName %>.services');
  app.registerModule('<%= slugifiedPluralName %>.routes', ['ui.router', 'core.routes', '<%= slugifiedPluralName %>.services']);
}(ApplicationConfiguration));
