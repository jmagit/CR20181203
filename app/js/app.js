angular.module("MyApp", ['MyCore', 'ngAnimate', 'ngRoute']);

angular.module("MyApp").run(function($templateCache) {
	$templateCache.put('views/demos3.html', '<h2>Adios mundo</h2>');
  });
  
angular.module("MyApp").config(['$routeProvider',  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/demos.html', controller: 'myController', controllerAs: 'vm'
      })
      .when('/inicio', {
        templateUrl: 'views/demos.html', controller: 'myController', controllerAs: 'vm'
	  })
	  .when('/como/me/de/la/gana', {
        templateUrl: 'views/demos2.html'
      })
	  .when('/como/pagina.html', {
        templateUrl: 'views/demos3.html'
      })
      .when('/personas', {
        templateUrl: 'views/personas/list.html', controller: 'PersonasController', controllerAs: 'vm'
	  })
	  // Ordenar correctamente las rutas
      .when('/personas/add', {
        templateUrl: 'views/personas/form.html', controller: 'PersonasController', controllerAs: 'vm'
      })
      .when('/personas/:id/edit', { // /personas/*/edit
        templateUrl: 'views/personas/form.html', controller: 'PersonasController', controllerAs: 'vm'
      })
      .when('/personas/:id', { // /personas/*
        templateUrl: 'views/personas/view.html', controller: 'PersonasController', controllerAs: 'vm'
      })
      .when('/personas/:id/:kk*', { // /personas/*/*
        templateUrl: 'views/personas/view.html', controller: 'PersonasController', controllerAs: 'vm'
      })
      .when('/pepito/grillo', {
        redirectTo: '/personas/2'
      })
      .otherwise({
        redirectTo: '/'
      });
}])

angular.module("MyApp").config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(["$q", "auth", function ($q, auth) {
        return {
            'request': function (config) {
                if (config.withCredentials && auth.isAuthenticated)
                    config.headers['Authorization'] = auth.token;
                return config;
            },
            'requestError': function(rejection) { return $q.reject(rejection); },
            'response': function (response) { return response; },
            'responseError': function(rejection) { return $q.reject(rejection); },
        };
    }]);
}]);

angular.module("MyApp").controller('PrincipalController', ['auth',
	function (auth) {
		this.title = 'Curso de AngularJS';
		this.auth = auth;
		this.seleccionado = null;
		this.selecciona = function(nuevo) {
			this.seleccionado = nuevo;
		}
		this.visible = true;
	}
]);

angular.module("MyApp").controller('myController', ['$scope', 'auth', 'NotificationService', 
	function ($scope, auth, notify) {
		var vm = this;
		vm.nombre = 'MUNDO';
		vm.resultado = '';
		vm.auth = auth;

		vm.saluda = function () {
			vm.resultado = "Hola " + vm.nombre;
		};
		vm.despide = function () {
			vm.resultado = "Adios " + vm.nombre;
		};
		vm.notifica = function () {
			notify.add("Notificación para " + vm.nombre);
		};
	}
]);

angular.module("MyApp").factory('auth', [function () {
	return {
		usuario: 'Admin',
		token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU0NDAxMTkwMn0.hVJk0Nu0RTH_Ap8mMP0t5ucoYIIrEun4_jxJj7aBVKg',
		isAuthenticated: true,
		login: function (usr, token) {
			this.usuario = usr;
			this.token = token;
			this.isAuthenticated = true;
		},
		logout: function () {
			this.usuario = '(anonimo)';
			this.token = null;
			this.isAuthenticated = false;
		}

	};
}]);

angular.module('MyApp').factory('NotificationService', ['$log', function ($log) {
	return {
		listado: [],
		hayMensajes: false,
		add: function (msg) {
			if (msg) {
				var id = this.listado.length ? this.listado[this.listado.length - 1].id + 1 : 1;
				this.listado.push({id: id, message: msg});
			} else {
				$log.error('Falta el mensaje.');
			}
			this.hayMensajes = this.listado.length > 0;
		},
		remove: function (index) {
			if (0 <= index && index < this.listado.length) {
				this.listado.splice(index, 1);
			} else {
				$log.error('Index out of range.');
			}
			this.hayMensajes = this.listado.length > 0;
		},
		clear: function () {
			this.listado = [];
			this.hayMensajes = false;
		},
	};
  }]);

angular.module('MyApp').component('appNotification', {
	templateUrl : 'views/notification.html',
	controller : ['NotificationService', function (srv) {
        this.notify = srv;
      }],
	controllerAs : 'vm',
});

angular.module('MyApp').directive("mySaludo",[function() {
	return {
    restrict:"E",
    replace : true,
    template:"<h1>Hola {{nombre}}</h1>",
    scope:{ nombre:"@" }
  };
}]);

angular.module("MyApp").component('appMenu', {
	template : '<p><input type="button" ng-repeat="item in vm.menu" value="{{item.texto}}" ng-click="vm.selecciona($index)" ></p>',
	controller : function () {
		var vm = this;
		vm.menu = [
			{ texto: 'Personas', template: 'views/personas.html'},
			{ texto: 'Demos1', template: 'views/demos.html'},
			{ texto: 'Demos2', template: 'views/demos2.html'},
			{ texto: 'Demos3', template: 'views/demos3.html'},
		];
		vm.selecciona = function(indice) {
			if(0 <= indice && indice < vm.menu.length && this.onSelecionado) {
				this.onSelecionado({seleccionado: vm.menu[indice].template});
			}
		};
		vm.$onInit = function() {
			if(this.onSelecionado) {
				this.onSelecionado({seleccionado: vm.menu[0].template});
			}
		}
	},
	controllerAs : 'vm',
	bindings : { onSelecionado : '&'}
});
