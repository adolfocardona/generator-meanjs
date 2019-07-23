(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
  }
}());
