(function () {
  'use strict';

  // Configuring the <%= humanizedPluralName %> Admin module
  angular
    .module('<%= slugifiedPluralName %>.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage <%= humanizedPluralName %>',
      state: 'admin.<%= slugifiedPluralName %>.list'
    });
  }
}());
