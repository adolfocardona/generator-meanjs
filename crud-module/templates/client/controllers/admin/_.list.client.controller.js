(function () {
  'use strict';

  angular
    .module('<%= slugifiedPluralName %>.admin')
    .controller('<%= classifiedPluralName %>AdminListController', <%= classifiedPluralName %>AdminListController);

  <%= classifiedPluralName %>AdminListController.$inject = ['$scope', '<%= classifiedPluralName %>Service', '<%= camelizedSingularName %>Resolve', 'uiGridConstants', '$translate', 'Notification', '$window'];

  function <%= classifiedPluralName %>AdminListController ($scope, <%= classifiedPluralName %>Service, <%= camelizedSingularName %>, uiGridConstants, $translate, Notification, $window) {

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
    <%- dataListClientController %>    
    var paginationOptions = {
      pageNumber: 1,
      pageSize: 10,
      sort: '-modified',
      filter: {},
      populate: { path: '<%- dataListClientController2 %>', field: '' }
    };

    $scope.gridOptions = {
      paginationPageSizes: [5, 10, 15],
      paginationPageSize: 10,
      useExternalPagination: true,
      useExternalSorting: true,
      enableFiltering: true,
      useExternalFiltering: true,
      enableColumnResizing: true,
      columnDefs: [
        {
          name: 'edit',
          displayName:'',
          enableFiltering: false,
          width: '1%',
          cellTemplate: '<div align="center"><button data-ui-sref="admin.<%= slugifiedPluralName %>.edit({<%= slugifiedSingularName %>Id: row.entity._id})"><i class="glyphicon glyphicon-pencil"></i></button></div>'
        },
        {
          name: 'delete',
          displayName:'',
          enableFiltering: false,
          width: '1%',
          cellTemplate: '<div align="center"><button ng-click="grid.appScope.remove(row.entity._id)"><i class="glyphicon glyphicon-trash"></i></button></div>'
        },<%- dataListClientController3 %>
        {
          displayName:$translate.instant('load.Global.DATE_MODIFIED'),
          field: 'modified',
          width: '20%',
          type: 'date',
          enableFiltering: true,
          enableCellEdit: false,
          filterHeaderTemplate: '<div class = "ui-grid-filter-container row"> <div ng-repeat = "colFilter in col.filters" class = "col-md-5 col-md-offset-0 col-sm-5 col-sm-offset-0"> <div custom-grid-date-filter-header> </div> </div> </div>',
          filters: [
            {
              name: 'From',
              condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL
            },
            {
              name: 'To',
              condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL
            }
          ],
          cellFilter: 'date:"yyyy/M/d h:mm:ss"'
        },
        {
          displayName:$translate.instant('load.Global.DATE_CREATED'),
          field: 'created',
          width: '20%',
          type: 'date',
          enableFiltering: true,
          enableCellEdit: false,
          filterHeaderTemplate: '<div class = "ui-grid-filter-container row"> <div ng-repeat = "colFilter in col.filters" class = "col-md-5 col-md-offset-0 col-sm-5 col-sm-offset-0"> <div custom-grid-date-filter-header> </div> </div> </div>',
          filters: [
            {
              name: 'From',
              condition: uiGridConstants.filter.GREATER_THAN_OR_EQUAL
            },
            {
              name: 'To',
              condition: uiGridConstants.filter.LESS_THAN_OR_EQUAL
            }
          ],
          cellFilter: 'date:"yyyy/M/d h:mm:ss"'
        },
        {
          displayName:$translate.instant('load.Global.STATUS'),
          field: 'status',
          width: '10%',
          filter: {
            type: uiGridConstants.filter.SELECT,
            selectOptions: [ 
              { value: '1', label: $translate.instant('load.Global.ACTIVE') }, 
              { value: '0', label: $translate.instant('load.Global.INACTIVE') } 
            ]
          },
          cellFilter: 'mapStatus'
        }
      ]
    };

    $scope.gridOptions.onRegisterApi = function (gridApi) {
      $scope.gridApi = gridApi;

      gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
        if (sortColumns.length === 0) {
          paginationOptions.sort = null;
        } else {
          paginationOptions.sort = sortColumns[0].sort.direction === 'asc' ? sortColumns[0].field : '-' + sortColumns[0].field;
        }
        getPage();
      });

      gridApi.core.on.filterChanged($scope, function () {
        var grid = this.grid;
        var items = {};
        
        var begin = moment("1900-01-01T00:00:00").format("YYYY-MM-DD H:mm:ss");
        var end = moment("2099-12-31T23:59:59").format("YYYY-MM-DD H:mm:ss");

        grid.columns.forEach(function (row) {
          if (row.filters[0].term !== undefined) {
            items[row.field] = row.filters[0].term;
          }         

          if (row.filters[0] !== undefined && row.filters[1] !== undefined) {
            if (row.filters[0].name == 'From' && row.filters[1].name == 'To') {
              items[row.field] = { begin: begin, end: end };
              //items[row.field].end = end;
              if (typeof row.filters[0].term !== 'undefined' && row.filters[0].term !== null) {
                items[row.field].begin = row.filters[0].term.begin;
              }
              if (typeof row.filters[1].term !== 'undefined' && row.filters[1].term !== null) {
                items[row.field].end = row.filters[1].term.end;
              }
            }
          }
                   
        });

        paginationOptions.filter = items;
        getPage();
      });

      gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
        paginationOptions.pageNumber = newPage;
        paginationOptions.pageSize = pageSize;
        getPage();
      });
    };

    function getPage () {
      <%= classifiedPluralName %>Service.get(paginationOptions, function (data) {
        $scope.gridOptions.totalItems = data.total;
        var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
        $scope.gridOptions.data = data.results;
      });
    }

    getPage();

    $scope.remove = function (id) {
      if ($window.confirm($translate.instant('load.System.MSN_DELETE'))) {
        vm.<%= camelizedSingularName %>.removeItem(id, function (rst) {

          if (rst.error) {
            Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i>  ' + $translate.instant('load.System.MSN_ERRORDELETE') });
            return false;
          }

          getPage();
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>  ' + $translate.instant('load.System.MSN_FULLDELETE') });
        });
      }
    };
  }

}());
