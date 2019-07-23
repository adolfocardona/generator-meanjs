(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
  }
}());
