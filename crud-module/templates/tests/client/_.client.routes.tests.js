(function () {
  'use strict';

  describe('<%= humanizedPluralName %> Route Tests', function () {
    // Initialize global variables
    var $scope,
      <%= classifiedPluralName %>Service;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _<%= classifiedPluralName %>Service_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      <%= classifiedPluralName %>Service = _<%= classifiedPluralName %>Service_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('<%= slugifiedPluralName %>');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/<%= slugifiedPluralName %>');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('<%= slugifiedPluralName %>.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/<%= slugifiedPluralName %>/client/views/list-<%= slugifiedPluralName %>.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          <%= classifiedPluralName %>Controller,
          mock<%= classifiedSingularName %>;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('<%= slugifiedPluralName %>.view');
          $templateCache.put('/modules/<%= slugifiedPluralName %>/client/views/view-<%= slugifiedSingularName %>.client.view.html', '');

          // create mock <%= slugifiedSingularName %>
          mock<%= classifiedSingularName %> = new <%= classifiedPluralName %>Service({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An <%= humanizedSingularName %> about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          <%= classifiedPluralName %>Controller = $controller('<%= classifiedPluralName %>Controller as vm', {
            $scope: $scope,
            <%= camelizedSingularName %>Resolve: mock<%= classifiedSingularName %>
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:<%= camelizedSingularName %>Id');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.<%= camelizedSingularName %>Resolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            <%= camelizedSingularName %>Id: 1
          })).toEqual('/<%= slugifiedPluralName %>/1');
        }));

        it('should attach an <%= slugifiedSingularName %> to the controller scope', function () {
          expect($scope.vm.<%= slugifiedSingularName %>._id).toBe(mock<%= classifiedSingularName %>._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('/modules/<%= slugifiedPluralName %>/client/views/view-<%= slugifiedSingularName %>.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/<%= slugifiedPluralName %>/client/views/list-<%= slugifiedPluralName %>.client.view.html', '');

          $state.go('<%= slugifiedPluralName %>.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('<%= slugifiedPluralName %>/');
          $rootScope.$digest();

          expect($location.path()).toBe('/<%= slugifiedPluralName %>');
          expect($state.current.templateUrl).toBe('/modules/<%= slugifiedPluralName %>/client/views/list-<%= slugifiedPluralName %>.client.view.html');
        }));
      });
    });
  });
}());
