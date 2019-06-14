'use strict';

var util = require('util'),
  inflections = require('underscore.inflections'),
  s = require('underscore.string'),
  _ = require('lodash'),
  mkdirp = require('mkdirp'),
  yeoman = require('yeoman-generator'),
  esprima = require('esprima');

var ModuleGenerator = yeoman.generators.Base.extend({
  init: function () {
  },
  askForName: function () {
   var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      default: 'test',
      message: 'What is the name of the module?'
    }];

    this.prompt(prompts, function (props) {
      this.name = props.name;

      this.slugifiedName = s(this.name).slugify().value();

      this.slugifiedPluralName = inflections.pluralize(this.slugifiedName);
      this.slugifiedSingularName = inflections.singularize(this.slugifiedName);

      this.camelizedPluralName = s(this.slugifiedPluralName).camelize().value();
      this.camelizedSingularName = s(this.slugifiedSingularName).camelize().value();

      this.classifiedPluralName = s(this.slugifiedPluralName).classify().value();
      this.classifiedSingularName = s(this.slugifiedSingularName).classify().value();

      this.classifiedAllPluralName = s(this.slugifiedPluralName).toUpperCase().value();
      this.classifiedAllSingularName = s(this.slugifiedSingularName).toUpperCase().value();

      this.humanizedPluralName = s(this.slugifiedPluralName).humanize().value();
      this.humanizedSingularName = s(this.slugifiedSingularName).humanize().value();

      this.capitalizedSingularName = s(this.humanizedSingularName).capitalize().value();

      done();
    }.bind(this));
  },
  askForVariables: function () {
   var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'vars',
      default: 'name,code',
      message: 'What are the fields of the models?'
    }];

    this.prompt(prompts, function (props) {      
      this.nameVar = props.vars.split(',');
      
      var data = '';
      var HumanizedName = this.humanizedSingularName;
      var SlugifiedName = this.slugifiedSingularName;
      var elementW = '';
      var elementX = '';
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") > -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element.substr(0, element.indexOf("(e)"));
          data += '\n' 
                + '  ' + inflections.singularize(s(elementW).slugify().value()) + '_id:' + ' {\n' 
                + '    _id: Schema.ObjectId,\n' 
                + '    name: ' + 'String' + "\n" 
                + '  },';
        } else if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {          
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += '\n' 
                + '  ' + inflections.singularize(s(elementW).slugify().value()) + '_id:' + ' {\n' 
                + '    type: Schema.ObjectId,\n' 
                + '    ref: ' + "'" + inflections.singularize(s(elementW).humanize().value()) + "'\n" 
                + '  },';
        } else {
          data += '\n' 
                + '  ' + inflections.singularize(s(element).slugify().value()) + ':' + ' {\n' 
                + '    type: String\n  },';
        }
      });
      this.dataModelServer = data;

      var data = '';
      var HumanizedName = this.humanizedSingularName;
      var SlugifiedName = this.slugifiedSingularName;
      var elementW = '';
      var elementX = '';
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") > -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element.substr(0, element.indexOf("(e)"));
          data += '\n' 
                + '    if (field == ' + "'" + inflections.singularize(s(elementW).slugify().value()) + '_id._id' + "'" + ' && params[' + "'" + inflections.singularize(s(elementW).slugify().value()) + '_id._id' + "'" + ']) {\n'
                + '      params[field] = mongoose.Types.ObjectId(params[field]);\n'
                + '    }' + '\n';
        } else if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {          
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += '\n' 
                + '    if (field == ' + "'" + inflections.singularize(s(elementW).slugify().value()) + '_id' + "'" + ' && params[' + "'" + inflections.singularize(s(elementW).slugify().value()) + '_id.name' + "'" + ']) {\n'
                + '      params[' + "'" + inflections.singularize(s(elementW).slugify().value()) + '_id' + "'" + '] = mongoose.Types.ObjectId(params[' + "'" + inflections.singularize(s(elementW).slugify().value()) + '_id.name' + "'" + ']);\n'
                + '      delete params[' + "'" + inflections.singularize(s(elementW).slugify().value()) + '_id.name' + "'" + '];\n'
                + '    }' + '\n';
        }
      });
      this.dataModelServer2 = data;

      var data = '';
      var HumanizedName = this.humanizedSingularName;
      var SlugifiedName = this.slugifiedSingularName;
      var elementW = '';
      var elementX = '';
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") > -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element.substr(0, element.indexOf("(e)"));
          data += '\n' 
                + '    vm.list' + inflections.pluralize(s(elementW).humanize().value()) + ' = [];\n' 
                + "\n" 
                + '    var options' + inflections.pluralize(s(elementW).humanize().value()) + ' = {\n'
                + '      pageNumber: 1,\n' 
                + '      field: [' + "'" + 'name' + "'" + '],\n' 
                + '      sort: '+ "'" + '-modified' + "'" + ',\n' 
                + '      filter: {}\n' 
                + '    };\n'
                + "\n"
                + '    vm.' + SlugifiedName + '.findAll' + inflections.pluralize(s(elementW).humanize().value()) + '(options' + inflections.pluralize(s(elementW).humanize().value()) + ', function (rst) {\n'
                + '      if(rst) {\n'
                + '        for (var item in rst) {\n'
                + '          if (!rst[item]._id) {\n'
                + '            continue;\n'
                + '          }\n'
                + '          vm.list' + inflections.pluralize(s(elementW).humanize().value()) + '.push({ value: rst[item].name, label: rst[item].name });\n'
                + '        }\n'
                + '      }\n'
                + '    });\n';
        } else if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += '\n' 
                + '    vm.list' + inflections.pluralize(s(elementW).humanize().value()) + ' = [];\n' 
                + "\n" 
                + '    var options' + inflections.pluralize(s(elementW).humanize().value()) + ' = {\n'
                + '      pageNumber: 1,\n' 
                + '      field: [' + "'" + 'name' + "'" + '],\n' 
                + '      sort: '+ "'" + '-modified' + "'" + ',\n' 
                + '      filter: {}\n' 
                + '    };\n'
                + "\n"
                + '    vm.' + SlugifiedName + '.findAll' + inflections.pluralize(s(elementW).humanize().value()) + '(options' + inflections.pluralize(s(elementW).humanize().value()) + ', function (rst) {\n'
                + '      if(rst) {\n'
                + '        for (var item in rst) {\n'
                + '          if (!rst[item]._id) {\n'
                + '            continue;\n'
                + '          }\n'
                + '          vm.list' + inflections.pluralize(s(elementW).humanize().value()) + '.push({ value: rst[item]._id, label: rst[item].name });\n'
                + '        }\n'
                + '      }\n'
                + '    });\n';
        }       
      });
      this.dataListClientController = data;

      var data = '';
      var HumanizedName = this.humanizedSingularName;
      var SlugifiedName = this.slugifiedSingularName;
      var elementW = '';
      var elementX = '';
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += '' + inflections.singularize(s(elementW).slugify().value()) + '_id ';
        }        
      });
      this.dataListClientController2 = data;

      var data = '';
      var HumanizedName = this.humanizedSingularName;
      var SlugifiedName = this.slugifiedSingularName;
      var elementW = '';
      var elementX = '';
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") > -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element.substr(0, element.indexOf("(e)"));
          data += '\n'
                + '        {\n'
                + '          displayName: $translate.instant(' + "'" + 'load.' + inflections.singularize(s(elementW).humanize().value()) + '.NAME' + "'" + '),\n'
                + '          field: ' + "'" + inflections.singularize(s(elementW).slugify().value()) + '_id.name' + "'" + ',\n'
                + '          width: ' + "'" + '20%' + "'" + ',\n'          
                + '          filter: {\n'
                + '            type: uiGridConstants.filter.SELECT,\n'
                + '            selectOptions: vm.list' + inflections.pluralize(s(elementW).humanize().value()) + '\n'
                + '          }\n'
                + '        },';
        } else if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += '\n'
                + '        {\n'
                + '          displayName: $translate.instant(' + "'" + 'load.' + inflections.singularize(s(elementW).humanize().value()) + '.NAME' + "'" + '),\n'
                + '          field: ' + "'" + inflections.singularize(s(elementW).slugify().value()) + '_id.name' + "'" + ',\n'
                + '          width: ' + "'" + '20%' + "'" + ',\n'          
                + '          filter: {\n'
                + '            type: uiGridConstants.filter.SELECT,\n'
                + '            selectOptions: vm.list' + inflections.pluralize(s(elementW).humanize().value()) + '\n'
                + '          }\n'
                + '        },';
        } else {
          data += '\n' 
               + '        {\n' 
               + '          displayName:$translate.instant(' + "'" + 'load.' + HumanizedName + '.' + _.toUpper(inflections.singularize(s(element).slugify().value())) + "'" + '),\n'
               + '          field: ' + "'" + inflections.singularize(s(element).slugify().value()) + "',\n" 
               + '          width: ' + "'" + '20\%' + "'\n"
               + '        },';
        }        
      });
      this.dataListClientController3 = data;

      var data = '';
      var HumanizedName = this.humanizedSingularName;
      var SlugifiedName = this.slugifiedSingularName;
      var elementW = '';
      var elementX = '';
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") > -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element.substr(0, element.indexOf("(e)"));
          data += '\n'
              + '        <div class = "form-group" show-errors>\n' 
              + '          <label class = "control-label" for = "' + inflections.singularize(s(elementW).slugify().value()) + '_id" translate>\n'
              + '            load.' + s(inflections.singularize(elementW)).capitalize().value() + '.NAME' + '\n'
              + '          </label>\n'
              + '          <select class = "form-control"\n'
              + '                  name = "'+ inflections.singularize(s(elementW).slugify().value()) + '_id"\n' 
              + '                  id = "' + inflections.singularize(s(elementW).slugify().value()) + '_id"\n'
              + '                  ng-model = "vm.' + SlugifiedName + '.' + inflections.singularize(s(elementW).slugify().value()) + '_id"\n'
              + '                  ng-init = "vm.' + SlugifiedName + '.' + inflections.singularize(s(elementW).slugify().value()) + '_id"\n'
              + '                  ng-options = "item as item.name for item in vm.list' + s(inflections.pluralize(elementW)).capitalize().value() + ' track by item._id"\n'
              + '                  required>\n'
              + '            <option value = "" translate>load.' + s(inflections.singularize(elementW)).capitalize().value() + '.SELECT</option>\n'
              + '          </select>\n'
              + '          <div ng-messages = "vm.form.' + SlugifiedName + 'Form.' + inflections.singularize(s(elementW).slugify().value()) + '_id.$error" role = "alert">\n'
              + '            <p class = "help-block error-text" ng-message = "required" translate>\n' 
              + '              load.' + s(inflections.singularize(elementW)).capitalize().value() + '.VAL_NAME\n'
              + '            </p>\n'
              + '          </div>\n'
              + '        </div>\n';
        } else if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += '\n'
              + '        <div class = "form-group" show-errors>\n' 
              + '          <label class = "control-label" for = "' + inflections.singularize(s(elementW).slugify().value()) + '_id" translate>\n'
              + '            load.' + s(inflections.singularize(elementW)).capitalize().value() + '.NAME' + '\n'
              + '          </label>\n'
              + '          <select class = "form-control"\n'
              + '                  name = "'+ inflections.singularize(s(elementW).slugify().value()) + '_id"\n' 
              + '                  id = "' + inflections.singularize(s(elementW).slugify().value()) + '_id"\n'
              + '                  ng-model = "vm.' + SlugifiedName + '.' + inflections.singularize(s(elementW).slugify().value()) + '_id"\n'
              + '                  ng-init = "vm.' + SlugifiedName + '.' + inflections.singularize(s(elementW).slugify().value()) + '_id"\n'
              + '                  ng-options = "item as item.name for item in vm.list' + s(inflections.pluralize(elementW)).capitalize().value() + ' track by item._id"\n'
              + '                  required>\n'
              + '            <option value = "" translate>load.' + s(inflections.singularize(elementW)).capitalize().value() + '.SELECT</option>\n'
              + '          </select>\n'
              + '          <div ng-messages = "vm.form.' + SlugifiedName + 'Form.' + inflections.singularize(s(elementW).slugify().value()) + '_id.$error" role = "alert">\n'
              + '            <p class = "help-block error-text" ng-message = "required" translate>\n' 
              + '              load.' + s(inflections.singularize(elementW)).capitalize().value() + '.VAL_NAME\n'
              + '            </p>\n'
              + '          </div>\n'
              + '        </div>\n';
        } else {
          data += '\n'
              + '        <div class = "form-group" show-errors>\n' 
              + '          <label class = "control-label" for = "' + inflections.singularize(s(element).slugify().value()) + '" translate>\n'
              + '            load.' + HumanizedName + '.' + _.toUpper(inflections.singularize(s(element).slugify().value())) + '\n'
              + '          </label>\n'
              + '          <input type = "text"\n'
              + '                 class = "form-control"\n'
              + '                 name = "'+ inflections.singularize(s(element).slugify().value()) + '"\n'
              + '                 id = "' + inflections.singularize(s(element).slugify().value()) + '"\n'
              + '                 ng-model = "vm.' + SlugifiedName + '.' + inflections.singularize(s(element).slugify().value()) + '"\n' 
              + '                 placeholder = "{{\'load.' + HumanizedName + '.' + _.toUpper(inflections.singularize(s(element).slugify().value())) + '\' |translate}}"\n' 
              + '                 required\n' 
              + '                 autofocus\n' 
              + '                 translate>\n' 
              + '          <div ng-messages = "vm.form.' + SlugifiedName + 'Form.' + inflections.singularize(s(element).slugify().value()) + '.$error" role = "alert">\n'
              + '            <p class = "help-block error-text" ng-message = "required" translate>\n' 
              + '              load.' + HumanizedName + '.VAL_' + _.toUpper(inflections.singularize(s(element).slugify().value())) + '\n'
              + '            </p>\n'
              + '          </div>\n'
              + '        </div>\n';
        }
      });
      this.dataFormClientView = data;

      var data = '';
      var CamelizedName = this.camelizedSingularName;
      var elementW = '';
      var elementX = '';      
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") > -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element.substr(0, element.indexOf("(e)"));
          data += '\n  ' + CamelizedName + '.' + inflections.singularize(s(elementW).slugify().value()) + '_id = req.body.' + inflections.singularize(s(elementW).slugify().value()) + '_id;';
        } else if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += '\n  ' + CamelizedName + '.' + inflections.singularize(s(elementW).slugify().value()) + '_id = req.body.' + inflections.singularize(s(elementW).slugify().value()) + '_id;';
        } else {
          data += '\n  ' + CamelizedName + '.' + inflections.singularize(s(element).slugify().value()) + ' = req.body.' + inflections.singularize(s(element).slugify().value()) + ';';
        }
      });
      this.dataServerController = data;

      var data = '';
      var CamelizedName = this.camelizedSingularName;
      var elementW = '';
      var elementX = '';      
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") > -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element.substr(0, element.indexOf("(e)"));
          data += '  // req.body.' + elementX + ' = JSON.parse(req.body.' + elementX + ');\n';
        } else if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += '  // req.body.' + elementX + ' = JSON.parse(req.body.' + elementX + ');\n';
        }
      });
      this.dataServerControllerDos = data;

      var data = '';
      var CamelizedName = this.camelizedSingularName;
      var elementW = '';
      var elementX = '';      
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += ' ' + inflections.singularize(s(elementW).slugify().value()) + '_id';
        }
      });
      this.dataServerController3 = data;

      var data = '';
      var CamelizedName = this.camelizedSingularName;
      var elementW = '';
      var elementX = '';      
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += ' ' + 'name';
        }
      });
      this.dataServerController4 = data;

      var data = '';
      var CamelizedName = this.camelizedSingularName;
      var elementW = '';
      var elementX = '';      
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") > -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element.substr(0, element.indexOf("(e)"));
          data += ',\n' 
              + '      findAll' + s(inflections.pluralize(elementW)).capitalize().value() + ': function (params, callback) {\n' 
              + '        var modules = $resource(' + "'" + '/api/' + inflections.pluralize(elementW) +  "/findAll'" + ', params);\n'
              + '        modules.query({}, function (rst) {\n'
              + '          callback(rst);\n'
              + '        });\n'
              + '      }';
        } else if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += ',\n' 
              + '      findAll' + s(inflections.pluralize(elementW)).capitalize().value() + ': function (params, callback) {\n' 
              + '        var modules = $resource(' + "'" + '/api/' + inflections.pluralize(elementW) +  "/findAll'" + ', params);\n'
              + '        modules.query({}, function (rst) {\n'
              + '          callback(rst);\n'
              + '        });\n'
              + '      }';
        }
      });
      this.dataClientService = data;

      var data = '';
      var CamelizedName = this.camelizedSingularName;
      var elementW = '';
      var elementX = '';      
      this.nameVar.forEach(function (element, index) {
        if (element.indexOf("_id") > -1 && element.indexOf("(e)") > -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element.substr(0, element.indexOf("(e)"));
          data += '\n' 
                + '    var options' + s(inflections.pluralize(elementW)).capitalize().value() + ' = {\n'
                + '      pageNumber: 1,\n'
                + '      field: [' + "'" + 'name' + "'" + '],\n'
                + '      sort: ' + "'" + '-modified' + "'" + ',\n'
                + '      filter: {}\n'
                + '    };\n'
                + '\n'
                + '    vm.' + CamelizedName + '.findAll' + s(inflections.pluralize(elementW)).capitalize().value() + '(' + 'options' + s(inflections.pluralize(elementW)).capitalize().value() + ', function (rst) {\n'
                + '      if(rst) {\n'
                + '        vm.list' + s(inflections.pluralize(elementW)).capitalize().value() + ' = rst;\n'
                + '      }\n'
                + '    });\n';
        } else if (element.indexOf("_id") > -1 && element.indexOf("(e)") == -1) {
          elementW = element.substr(0, element.indexOf("_id"));
          elementX = element;
          if ( element.indexOf("(") > - 1 ) {
            elementX = element.substr(0, element.indexOf("("));
          }
          data += '\n' 
                + '    var options' + s(inflections.pluralize(elementW)).capitalize().value() + ' = {\n'
                + '      pageNumber: 1,\n'
                + '      field: [' + "'" + 'name' + "'" + '],\n'
                + '      sort: ' + "'" + '-modified' + "'" + ',\n'
                + '      filter: {}\n'
                + '    };\n'
                + '\n'
                + '    vm.' + CamelizedName + '.findAll' + s(inflections.pluralize(elementW)).capitalize().value() + '(' + 'options' + s(inflections.pluralize(elementW)).capitalize().value() + ', function (rst) {\n'
                + '      if(rst) {\n'
                + '        vm.list' + s(inflections.pluralize(elementW)).capitalize().value() + ' = rst;\n'
                + '      }\n'
                + '    });\n';
          }
        });
      this.dataClientController = data;

      done();
    }.bind(this));
  },
  askForModuleFolders: function () {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'clientFolders',
      message: 'Which client-side folders would you like your module to include?',
      choices: [{
        value: 'addCSSFolder',
        name: 'css',
        checked: false
      }, {
        value: 'addImagesFolder',
        name: 'img',
        checked: false
      }, {
        value: 'addDirectivesFolder',
        name: 'directives',
        checked: false
      }, {
        value: 'addFiltersFolder',
        name: 'filters',
        checked: false
      }]
    }, {
      type: 'confirm',
      name: 'addMenuItems',
      message: 'Would you like to add the CRUD module links to a menu?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      var clientFolders = {},
        serverFolders = {};

      _.forEach(props.clientFolders, function (prop) {
        clientFolders[prop] = true;
      });
      _.forEach(props.serverFolders, function (prop) {
        serverFolders[prop] = true;
      });

      this.clientFolders = clientFolders;
      this.serverFolders = serverFolders;

      this.addMenuItems = props.addMenuItems;

      done();
    }.bind(this));
  },

  askForMenuId: function () {
    if (this.addMenuItems) {
      var done = this.async();

      var prompts = [{
        name: 'menuId',
        message: 'What is your menu identifier(Leave it empty and press ENTER for the default "topbar" menu)?',
        default: 'topbar'
      }];

      this.prompt(prompts, function (props) {
        this.menuId = props.menuId;

        done();
      }.bind(this));
    }
  },

  renderModule: function () {
    // Create module folder
    mkdirp.sync('modules/' + this.slugifiedPluralName);

    // Create module supplemental folders
    if (this.clientFolders.addCSSFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/client/css');
    }

    if (this.clientFolders.addImagesFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/client/img');
    }

    if (this.clientFolders.addDirectivesFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/client/directives');
    }

    if (this.clientFolders.addFiltersFolder) {
      mkdirp.sync('modules/' + this.slugifiedPluralName + '/client/filters');
    }

    // Render angular module files
    // this.template('client/config/_.client.routes.js', 'modules/' + this.slugifiedPluralName + '/client/config/' + this.slugifiedPluralName + '.client.routes.js');
    this.template('client/config/_-admin.client.routes.js', 'modules/' + this.slugifiedPluralName + '/client/config/' + this.slugifiedPluralName + '-admin.client.routes.js');
    this.template('client/config/_-admin.client.config.js', 'modules/' + this.slugifiedPluralName + '/client/config/' + this.slugifiedPluralName + '-admin.client.config.js');
    // this.template('client/controllers/_.client.controller.js', 'modules/' + this.slugifiedPluralName + '/client/controllers/' + this.slugifiedPluralName + '.client.controller.js');
    // this.template('client/controllers/_.list.client.controller.js', 'modules/' + this.slugifiedPluralName + '/client/controllers/list-' + this.slugifiedPluralName + '.client.controller.js');
    this.template('client/controllers/admin/_.client.controller.js', 'modules/' + this.slugifiedPluralName + '/client/controllers/admin/' + this.slugifiedPluralName + '.client.controller.js');
    this.template('client/controllers/admin/_.list.client.controller.js', 'modules/' + this.slugifiedPluralName + '/client/controllers/admin/list-' + this.slugifiedPluralName + '.client.controller.js');
    this.template('client/services/_.client.service.js', 'modules/' + this.slugifiedPluralName + '/client/services/' + this.slugifiedPluralName + '.client.service.js');

    // Render angular tests
    this.template('tests/client/_.admin.client.controller.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/client/admin.' + this.slugifiedPluralName + '.client.controller.tests.js');
    this.template('tests/client/_.admin.client.routes.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/client/admin.' + this.slugifiedPluralName + '.client.routes.tests.js');
    this.template('tests/client/_.admin.list.client.controller.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/client/admin.list.' + this.slugifiedPluralName + '.client.controller.tests.js');
    
    // Render angular admin tests
    // this.template('tests/client/_.client.controller.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/client/' + this.slugifiedPluralName + '.client.controller.tests.js');
    // this.template('tests/client/_.client.routes.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/client/' + this.slugifiedPluralName + '.client.routes.tests.js');
    // this.template('tests/client/_.list.client.controller.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/client/list-' + this.slugifiedPluralName + '.client.controller.tests.js');

    // Render angular module views
    // this.template('client/views/_.view.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/view-' + this.slugifiedSingularName + '.client.view.html');
    // this.template('client/views/_.list.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/list-' + this.slugifiedPluralName + '.client.view.html');
    this.template('client/views/admin/_.form.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/admin/form-' + this.slugifiedSingularName + '.client.view.html');
    this.template('client/views/admin/_.list.client.view.html', 'modules/' + this.slugifiedPluralName + '/client/views/admin/list-' + this.slugifiedPluralName + '.client.view.html');
    // Render menu configuration
    // if (this.addMenuItems) {
    //   this.template('client/config/_.client.menus.js', 'modules/' + this.slugifiedPluralName + '/client/config/' + this.slugifiedPluralName + '.client.menus.js');
    // }

    // Render angular module definition
    this.template('client/_.client.module.js', 'modules/' + this.slugifiedPluralName + '/client/' + this.slugifiedPluralName + '.client.module.js');

    // Render e2e tests
    this.template('tests/e2e/_.e2e.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/e2e/' + this.slugifiedPluralName + '.e2e.tests.js');

    // Render server module config
    this.template('server/config/_.server.config.js', 'modules/' + this.slugifiedPluralName + '/server/config/' + this.slugifiedPluralName + '.server.config.js');

    // Render express module files
    this.template('server/controllers/_.server.controller.js', 'modules/' + this.slugifiedPluralName + '/server/controllers/' + this.slugifiedPluralName + '.server.controller.js');
    this.template('server/models/_.server.model.js', 'modules/' + this.slugifiedPluralName + '/server/models/' + this.slugifiedSingularName + '.server.model.js');
    this.template('server/routes/_.server.routes.js', 'modules/' + this.slugifiedPluralName + '/server/routes/' + this.slugifiedPluralName + '.server.routes.js');

    // Render express policy
    this.template('server/policies/_.server.policy.js', 'modules/' + this.slugifiedPluralName + '/server/policies/' + this.slugifiedPluralName + '.server.policy.js');

    // Add express module tests
    this.template('tests/server/_.server.model.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/server/' + this.slugifiedSingularName + '.server.model.tests.js');
    this.template('tests/server/_.server.routes.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/server/' + this.slugifiedSingularName + '.server.routes.tests.js');

    // Add express admin module tests
    this.template('tests/server/_.admin.server.routes.tests.js', 'modules/' + this.slugifiedPluralName + '/tests/server/admin.' + this.slugifiedSingularName + '.server.routes.tests.js');
    
  }
});

module.exports = ModuleGenerator;
