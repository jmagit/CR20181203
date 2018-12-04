angular.module("MyApp", ['MyCore']);

angular.module("MyApp").run(function($templateCache) {
	$templateCache.put('views/demos3.html', '<h2>Adios mundo</h2>');
  });
  
angular.module("MyApp").controller('PrincipalController', ['auth',
	function (auth) {
		this.title = 'Curso de AngularJS';
		this.auth = auth;
		this.seleccionado = null;
		this.selecciona = function(nuevo) {
			this.seleccionado = nuevo;
		}
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
		usuario: '(anonimo)',
		token: null,
		isAuthenticated: false,
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
