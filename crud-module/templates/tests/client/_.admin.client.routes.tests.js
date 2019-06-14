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
          mainstate = $state.get('admin.<%= slugifiedPluralName %>');
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
          liststate = $state.get('admin.<%= slugifiedPluralName %>.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/<%= slugifiedPluralName %>/client/views/admin/list-<%= slugifiedPluralName %>.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          <%= classifiedPluralName %>AdminController,
          mock<%= classifiedSingularName %>;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.<%= slugifiedPluralName %>.create');
          $templateCache.put('/modules/<%= slugifiedPluralName %>/client/views/admin/form-<%= slugifiedSingularName %>.client.view.html', '');

          // Create mock <%= slugifiedSingularName %>
          mock<%= classifiedSingularName %> = new <%= classifiedPluralName %>Service();

          // Initialize Controller
          <%= classifiedPluralName %>AdminController = $controller('<%= classifiedPluralName %>AdminController as vm', {
            $scope: $scope,
            <%= camelizedSingularName %>Resolve: mock<%= classifiedSingularName %>
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.<%= camelizedSingularName %>Resolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/<%= slugifiedPluralName %>/create');
        }));

        it('should attach an <%= slugifiedSingularName %> to the controller scope', function () {
          expect($scope.vm.<%= slugifiedSingularName %>._id).toBe(mock<%= classifiedSingularName %>._id);
          expect($scope.vm.<%= slugifiedSingularName %>._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('/modules/<%= slugifiedPluralName %>/client/views/admin/form-<%= slugifiedSingularName %>.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          <%= classifiedPluralName %>AdminController,
          mock<%= classifiedSingularName %>;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.<%= slugifiedPluralName %>.edit');
          $templateCache.put('/modules/<%= slugifiedPluralName %>/client/views/admin/form-<%= slugifiedSingularName %>.client.view.html', '');

          // Create mock <%= slugifiedSingularName %>
          mock<%= classifiedSingularName %> = new <%= classifiedPluralName %>Service({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An <%= humanizedSingularName %> about MEAN',
            content: 'MEAN rocks!'
          });

          // Initialize Controller
          <%= classifiedPluralName %>AdminController = $controller('<%= classifiedPluralName %>AdminController as vm', {
            $scope: $scope,
            <%= camelizedSingularName %>Resolve: mock<%= classifiedSingularName %>
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:<%= camelizedSingularName %>Id/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.<%= camelizedSingularName %>Resolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            <%= camelizedSingularName %>Id: 1
          })).toEqual('/admin/<%= slugifiedPluralName %>/1/edit');
        }));

        it('should attach an <%= slugifiedSingularName %> to the controller scope', function () {
          expect($scope.vm.<%= slugifiedSingularName %>._id).toBe(mock<%= classifiedSingularName %>._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('/modules/<%= slugifiedPluralName %>/client/views/admin/form-<%= slugifiedSingularName %>.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
