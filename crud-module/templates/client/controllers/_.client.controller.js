(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>')
    .controller('<%= classifiedPluralName %>Controller', <%= classifiedPluralName %>Controller);

  <%= classifiedPluralName %>Controller.$inject = ['$scope', '<%= camelizedSingularName %>Resolve', 'Authentication'];

  function <%= classifiedPluralName %>Controller($scope, <%= camelizedSingularName %>, Authentication) {
    var vm = this;

    vm.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
    vm.authentication = Authentication;

  }
}());
