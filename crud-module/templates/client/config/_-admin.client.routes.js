(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig ($stateProvider) {
    $stateProvider
      .state('admin.<%= slugifiedPluralName %>', {
        abstract: true,
        url: '/<%= slugifiedPluralName %>',
        template: '<ui-view/>'
      })
      .state('admin.<%= slugifiedPluralName %>.list', {
        url: '',
        templateUrl: '/modules/<%= slugifiedPluralName %>/client/views/admin/list-<%= slugifiedPluralName %>.client.view.html',
        controller: '<%= classifiedPluralName %>AdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          <%= slugifiedSingularName %>Resolve: get<%= classifiedSingularName %>
        },
        ncyBreadcrumb: {
          label: '<%= classifiedPluralName %>',
          parent: 'admin.dashboard'
        }
      })
      .state('admin.<%= slugifiedPluralName %>.create', {
        url: '/create',
        templateUrl: '/modules/<%= slugifiedPluralName %>/client/views/admin/form-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= classifiedPluralName %>AdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          <%= slugifiedSingularName %>Resolve: new<%= classifiedSingularName %>
        },
        ncyBreadcrumb: {
          label: 'New <%= classifiedSingularName %>',
          parent: 'admin.<%= slugifiedPluralName %>.list'
        }
      })
      .state('admin.<%= slugifiedPluralName %>.edit', {
        url: '/:<%= camelizedSingularName %>Id/edit',
        templateUrl: '/modules/<%= slugifiedPluralName %>/client/views/admin/form-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= classifiedPluralName %>AdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ <%= slugifiedSingularName %>Resolve.title }}'
        },
        resolve: {
          <%= slugifiedSingularName %>Resolve: get<%= classifiedSingularName %>
        },
        ncyBreadcrumb: {
          label: 'Edit <%= classifiedSingularName %>',
          parent: 'admin.<%= slugifiedPluralName %>.list'
        }
      });
  }

  get<%= classifiedSingularName %>.$inject = ['$stateParams', '<%= classifiedPluralName %>Service'];

  function get<%= classifiedSingularName %> ($stateParams, <%= classifiedPluralName %>Service) {
    return <%= classifiedPluralName %>Service.get({
      <%= camelizedSingularName %>Id: $stateParams.<%= camelizedSingularName %>Id
    }).$promise;
  }

  new<%= classifiedSingularName %>.$inject = ['<%= classifiedPluralName %>Service'];

  function new<%= classifiedSingularName %> (<%= classifiedPluralName %>Service) {
    return new <%= classifiedPluralName %>Service();
  }
}());
