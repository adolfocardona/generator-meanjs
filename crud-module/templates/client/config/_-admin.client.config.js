(function () {
  'use strict';

  // Configuring the <%= humanizedPluralName %> Admin module
  angular
    .module('<%= slugifiedPluralName %>.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig (Menus) {
    // Set top bar menu items
    // Menus.addMenuItem('topbar', {
    //   title: '<%= humanizedPluralName %>',
    //   state: '<%= slugifiedPluralName %>',
    //   module: '<%= slugifiedPluralName %>',
    //   type: 'dropdown',
    //   roles: ['/api/<%= slugifiedPluralName %>']
    // });

    // Set top bar menu items
    Menus.addSubMenuItem('topbar', 'users', {
      title: 'MANAGE_<%= classifiedAllPluralName %>',
      state: 'admin.<%= slugifiedPluralName %>.list',
      module: '<%= slugifiedPluralName %>',
      roles: ['/api/<%= slugifiedPluralName %>']
    });
  }
}());
