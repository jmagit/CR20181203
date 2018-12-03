angular.module("MyApp", ['MyCore']);

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