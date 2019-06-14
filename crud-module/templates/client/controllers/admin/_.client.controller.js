(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>.admin')
    .controller('<%= classifiedPluralName %>AdminController', <%= classifiedPluralName %>AdminController);

  <%= classifiedPluralName %>AdminController.$inject = ['$scope', '$state', '$window', '<%= camelizedSingularName %>Resolve', 'Authentication', 'Notification', '$translate'];

  function <%= classifiedPluralName %>AdminController ($scope, $state, $window, <%= camelizedSingularName %>, Authentication, Notification, $translate) {

    $('#nav-accordion').dcAccordion({
      eventType: 'click',
      autoClose: false,
      saveState: true,
      disableLink: true,
      speed: 'slow',
      showCount: false,
      autoExpand: true,
      classExpand: 'dcjq-current-parent'
    });

    jQuery('#sidebar .sub-menu > a').click(function () {
      var o = ($(this).offset());
      var diff = 250 - o.top;
      if (diff > 0) {
        $('#sidebar').scrollTo('-=' + Math.abs(diff), 500);
      } else {
        $('#sidebar').scrollTo('+=' + Math.abs(diff), 500);
      }
    });

    var mobile = isMobile();

    // si es desde un pc
    if (mobile === null) {
      $('#sidebar').css('overflow', 'scroll');
      $('#sidebar').css('height', '100%');
      $('html').css('overflow', 'scroll');
      $('html').css('height', '100%');
    } else {
      jQuery('#sidebar .sub-menu > ul > li').click(function () {
        if ($('.ng-binding').hasClass('active')) {
          $('.ng-binding').removeClass('active');
          $('.fa-bars').addClass('hide-menu');
          $('#sidebar').css('width', '0px');
        }
        if ($('.dcjq-parent').hasClass('active')) {
          $('.dcjq-parent').removeClass('active');
          $('.fa-bars').addClass('hide-menu');
          $('#sidebar').css('width', '0px');
        }
      });
      $('#sidebar').css('overflow', 'scroll');
      $('#sidebar').css('height', 'auto');
      $('html').css('overflow', 'scroll');
      $('html').css('height', 'auto');
    }

    function isMobile () {
      return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
      );
    }

    var vm = this;
    vm.<%= camelizedSingularName %> = <%= camelizedSingularName %>;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    <%- dataClientController %>
    // Remove existing <%= humanizedSingularName %>
    function remove () {
      if ($window.confirm($translate.instant('load.System.MSN_DELETE'))) {
        vm.<%= camelizedSingularName %>.$remove(function (rst) {

          if (rst.error) {
            $state.go('admin.<%= slugifiedPluralName %>.list');
            Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i> ' + $translate.instant('load.<%= humanizedSingularName %>.TITLE') + '<br>' + $translate.instant('load.System.MSN_ERRORDELETE') + '<br/>' });
            return false;
          }

          $state.go('admin.<%= slugifiedPluralName %>.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> ' + $translate.instant('load.<%= humanizedSingularName %>.TITLE') + '<br>' + $translate.instant('load.System.MSN_FULLDELETE') + '<br/>' });
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
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> ' + $translate.instant('load.<%= humanizedSingularName %>.TITLE') + '<br>' + $translate.instant('load.System.MSN_FULLSAVE') + '<br/>' });
      }

      function errorCallback (res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' + $translate.instant('load.<%= humanizedSingularName %>.TITLE') + '<br>' + $translate.instant('load.System.MSN_ERROR') + '<br/>' });
      }
    }
  }
}());
