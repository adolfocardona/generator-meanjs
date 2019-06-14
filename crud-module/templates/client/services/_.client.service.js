(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>.services')
    .factory('<%= classifiedPluralName %>Service', <%= classifiedPluralName %>Service);

  <%= classifiedPluralName %>Service.$inject = ['$resource', '$log'];

  function <%= classifiedPluralName %>Service ($resource, $log) {
    var <%= classifiedSingularName %> = $resource('/api/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id', {
      <%= camelizedSingularName %>Id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(<%= classifiedSingularName %>.prototype, {
      createOrUpdate: function () {
        var <%= camelizedSingularName %> = this;
        return createOrUpdate(<%= camelizedSingularName %>);
      },
      removeItem: function (id, callback) {
        var modules = $resource('/api/<%= slugifiedPluralName %>/' + id);
        modules.remove(id, function (rst) {
          callback(rst);
        });
      },
      findAll: function (params, callback) {
        var modules = $resource('/api/<%= slugifiedPluralName %>/findAll', params);
        modules.query({}, function (rst) {
          callback(rst);
        });
      }<%- dataClientService %>
    });

    return <%= classifiedSingularName %>;

    function createOrUpdate (<%= camelizedSingularName %>) {
      if (<%= camelizedSingularName %>._id) {
        return <%= camelizedSingularName %>.$update(onSuccess, onError);
      } else {
        return <%= camelizedSingularName %>.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess (<%= camelizedSingularName %>) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError (errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError (error) {
      // Log error
      $log.error(error);
    }
  }
}());
