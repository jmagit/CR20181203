angular.module('MyCore', []);

angular.module('MyCore').filter("capitalize", function () {
    return function (s) {
      if (typeof(s)==="string") {
        return s.charAt(0).toUpperCase() + 
            s.substring(1, s.length).toLowerCase();
      }
      return s;
    };
  });

angular.module('MyCore').directive("myRemarcado",[function() {
    return {
      restrict:"A",
      scope:{ myRemarcado:"@" },
      link: function(scope, element, attrs, controller, transcludeFn) {
        var color = element.css( "background-color" );
        var newColor = scope.myRemarcado ? scope.myRemarcado : 'yellow';
        element.on( "mouseover", function() {
            element.css('background-color', newColor);
        });
        element.on( "mouseleave", function() {
            element.css('background-color', color);
        });
    }
    
    };
}]);

angular.module('MyCore').directive("myCard",[function() {
	return {
    restrict:"E",
    replace : true,
    transclude : true,
    template:'<div class="my-card"><h1 class="my-card-title">{{titulo}}</h1><div class="my-card-body" ng-transclude></div></div>',
    scope:{ titulo:"@" }
  };
}]);

angular.module('MyCore').directive('myTabs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: ['$scope', function MyTabsController($scope) {
      var panes = $scope.panes = [];
      $scope.select = function(pane) {
        angular.forEach(panes, function(item) {
          item.selected = item == pane;
        });
      };
      this.addPane = function(pane) {
        panes.push(pane);
        if (panes.length === 1) 
          $scope.select(pane);
      };
    }],
    template: '<table><tr><td ng-repeat="pane in panes" ng-click="select(pane)" ' +
        'ng-class="{\'tab-active\':pane.selected,\'tab-inactive\':!pane.selected}">{{pane.title}}</td></tr></table>' +
        '<div class="tab-content" ng-transclude></div>',
  };
});

angular.module('MyCore').directive('myPane', function() {
  return {
    require: '^^myTabs',
    restrict: 'E',
    transclude: true,
    scope: { title: '@' },
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addPane(scope);
    },
    template: '<div class="tab-pane" ng-show="selected" ng-transclude></div>'
  };
});

angular.module('MyCore').directive('valInteger', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.valInteger = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // tratamos los modelos vacíos como correctos
          return true;
        }
        return /^\-?\d+$/.test(viewValue);
      };
    }
  };
});

function esUnNIFValaido(value) {
  if (!(/^\d{1,8}\w$/.test(value))) return false;
  var letterValue = value.substr(value.length - 1);
  var numberValue = value.substr(0, value.length - 1);
  return letterValue.toUpperCase() === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(numberValue % 23);
}
angular.module("MyCore").directive('valNif', function() {
  return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
          ctrl.$validators.valNif = function(modelValue, viewValue) {
              // tratamos los modelos vacíos como correctos
              if (ctrl.$isEmpty(modelValue)) {
                  return true;
              }
              return esUnNIFValaido(viewValue);
          };
      }
  };
});

angular.module("MyCore").directive("lblTitle", [function() {
  return {
      restrict: "A",
      link: function(scope, element, attrs, controller, transcludeFn) {
          var lbl = "<label" +
              (attrs.class ? (" class='" + attrs.class + "'") : "") +
              ">" + attrs.lblTitle + ": </label>";
          element.removeAttr('lbl-title');
          element.wrap(lbl);
      }
  };
}]);
angular.module("MyCore").directive("confirm", ['$window', '$parse', function($window, $parse) {
  return {
      restrict: "A",
      link: function(scope, element, attrs, controller, transcludeFn) {
        if(!attrs.confirm) 
          throw new Error("Falta el argumento");
        var fn = $parse(attrs.confirm);
        element.on('click', function(event) {
            if($window.confirm(attrs.confirmMsg ? attrs.confirmMsg : '¿Seguro?')) {
                scope.$apply(function() {
                  fn(scope, {$event: event});
                });
            }
        });
      }
  };
}]);
