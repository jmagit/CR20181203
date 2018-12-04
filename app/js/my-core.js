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
