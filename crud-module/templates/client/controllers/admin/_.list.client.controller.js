(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>.admin')
    .controller('<%= classifiedPluralName %>AdminListController', <%= classifiedPluralName %>AdminListController);

  <%= classifiedPluralName %>AdminListController.$inject = ['<%= classifiedPluralName %>Service'];

  function <%= classifiedPluralName %>AdminListController (<%= classifiedPluralName %>Service) {
    var vm = this;

    vm.<%= camelizedPluralName %> = <%= classifiedPluralName %>Service.query();
  }
}());
