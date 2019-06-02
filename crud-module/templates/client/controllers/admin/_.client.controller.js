(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>.admin')
    .controller('<%= classifiedPluralName %>AdminController', <%= classifiedPluralName %>AdminController);

  <%= classifiedPluralName %>AdminController.$inject = ['$scope', '$state', '$window', '<%= camelizedSingularName %>Resolve', 'Authentication', 'Notification'];

  function <%= classifiedPluralName %>AdminController ($scope, $state, $window, <%= camelizedSingularName %>, Authentication, Notification) {
    var vm = this;

    vm.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing <%= humanizedSingularName %>
    function remove () {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.<%= camelizedSingularName %>.$remove(function () {
          $state.go('admin.<%= slugifiedPluralName %>.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> <%= humanizedSingularName %> deleted successfully!' });
        });
      }
    }

    // Save <%= humanizedSingularName %>
    function save (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.<%= camelizedSingularName %>Form');
        return false;
      }

      // Create a new <%= camelizedSingularName %>, or update the current instance
      vm.<%= camelizedSingularName %>.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback (res) {
        $state.go('admin.<%= slugifiedPluralName %>.list'); // should we send the User to the list or the updated <%= humanizedSingularName %>'s view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> <%= humanizedSingularName %> saved successfully!' });
      }

      function errorCallback (res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> <%= humanizedSingularName %> save error!' });
      }
    }
  }
}());
