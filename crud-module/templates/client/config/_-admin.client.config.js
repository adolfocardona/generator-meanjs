(function () {
  'use strict';

  // Configuring the <%= humanizedPluralName %> Admin module
  angular
    .module('<%= slugifiedPluralName %>.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

    menuService.addSubMenuItem('topbar', 'users', {
      title: 'load.Menu.MANAGE_<%= humanizedPluralName %>',
      state: 'admin.<%= slugifiedPluralName %>.list',
      position: 4,
      roles: ['/api/<%= slugifiedPluralName %>']
    });
  }
}());
