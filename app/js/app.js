angular.module("MyApp", ['MyCore']);

angular.module("MyApp").run(function($templateCache) {
	$templateCache.put('views/demos3.html', '<h2>Adios mundo</h2>');
  });
  
angular.module("MyApp").controller('PrincipalController', ['auth',
	function (auth) {
		this.title = 'Curso de AngularJS';
		this.auth = auth;

	}
]);

angular.module("MyApp").controller('myController', ['$scope', 'auth',
	function ($scope, auth) {
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
  