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
        controller: '<%= humanizedPluralName %>AdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.<%= slugifiedPluralName %>.create', {
        url: '/create',
        templateUrl: '/modules/<%= slugifiedPluralName %>/client/views/admin/form-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= humanizedPluralName %>AdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          <%= slugifiedSingularName %>Resolve: new<%= classifiedSingularName %>
        }
      })
      .state('admin.<%= slugifiedPluralName %>.edit', {
        url: '/:<%= slugifiedSingularName %>Id/edit',
        templateUrl: '/modules/<%= slugifiedPluralName %>/client/views/admin/form-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= humanizedPluralName %>AdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ <%= slugifiedSingularName %>Resolve.title }}'
        },
        resolve: {
          <%= slugifiedSingularName %>Resolve: get<%= classifiedSingularName %>
        }
      });
  }

  get<%= classifiedSingularName %>.$inject = ['$stateParams', '<%= humanizedPluralName %>Service'];

  function get<%= classifiedSingularName %> ($stateParams, <%= humanizedPluralName %>Service) {
    return <%= humanizedPluralName %>Service.get({
      <%= slugifiedSingularName %>Id: $stateParams.<%= slugifiedSingularName %>Id
    }).$promise;
  }

  new<%= classifiedSingularName %>.$inject = ['<%= humanizedPluralName %>Service'];

  function new<%= classifiedSingularName %> (<%= humanizedPluralName %>Service) {
    return new <%= humanizedPluralName %>Service();
  }
}());
