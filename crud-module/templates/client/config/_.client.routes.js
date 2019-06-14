(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('<%= slugifiedPluralName %>', {
        abstract: true,
        url: '/<%= slugifiedPluralName %>',
        template: '<ui-view/>'
      })
      .state('<%= slugifiedPluralName %>.list', {
        url: '',
        templateUrl: '/modules/<%= slugifiedPluralName %>/client/views/list-<%= slugifiedPluralName %>.client.view.html',
        controller: '<%= classifiedPluralName %>ListController',
        controllerAs: 'vm',
        data: {
          pageTitle: '<%= humanizedPluralName %> List'
        }
      })
      .state('<%= slugifiedPluralName %>.view', {
        url: '/:<%= camelizedSingularName %>Id',
        templateUrl: '/modules/<%= slugifiedPluralName %>/client/views/view-<%= slugifiedSingularName %>.client.view.html',
        controller: '<%= classifiedPluralName %>Controller',
        controllerAs: 'vm',
        resolve: {
          <%= slugifiedSingularName %>Resolve: get<%= classifiedSingularName %>
        },
        data: {
          pageTitle: '<%= humanizedSingularName %> {{ <%= slugifiedSingularName %>Resolve.title }}'
        }
      });
  }

  get<%= classifiedSingularName %>.$inject = ['$stateParams', '<%= classifiedPluralName %>Service'];

  function get<%= classifiedSingularName %>($stateParams, <%= classifiedPluralName %>Service) {
    return <%= classifiedPluralName %>Service.get({
      <%= camelizedSingularName %>Id: $stateParams.<%= camelizedSingularName %>Id
    }).$promise;
  }
}());
