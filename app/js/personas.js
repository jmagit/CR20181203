angular.module("MyApp").factory("PersonasService", [
    function() {
      return {
        listado: [
          { id: 1, nombre: "Carmelo", apellidos: "Coton", edad: 34 },
          { id: 2, nombre: "Pepito", apellidos: "Grillo", edad: 155 },
          { id: 3, nombre: "Pedro", apellidos: "Pica Piedra", edad: 50 },
          { id: 4, nombre: "Pablo", apellidos: "Marmol", edad: 47 }
        ]
      };
    }
]);

angular.module('MyApp').controller('PersonasController',
    ['$window', 'PersonasService', 'NotificationService', '$routeParams', '$location', 
    function ($window, srv, notify, $routeParams, $location) {
        var vm = this;

        vm.modo = 'list';
        vm.listado = null;
        vm.elemento = {};
        var idOriginal = null;
        var pk = 'id';
        var urlList = '/personas';

        vm.list = function () {
            if (!vm.listado) {
                vm.listado = srv.listado;
            }
            vm.modo = 'list';
        };

        vm.add = function () {
            vm.elemento = {};
            vm.modo = 'add';
        };
        vm.edit = function (key) {
            var rslt = vm.listado.find(function (item) {
                return item[pk] == key;
            });
            if (rslt) {
                vm.elemento = angular.copy(rslt);
                idOriginal = key;
                vm.modo = 'edit';
            } else {
                notify.add('Elemento no encontrado.');
            }
        };
        vm.view = function (key) {
            var rslt = vm.listado.find(function (item) {
                return item[pk] == key;
            });
            if (rslt) {
                vm.elemento = angular.copy(rslt);
                vm.modo = 'view';
            } else {
                notify.add('Elemento no encontrado.');
            }
        };
        vm.delete = function (key) {
            // if (!$window.confirm('¿Seguro?')) return;
            var index = vm.listado.findIndex(function (item) {
                return item[pk] == key;
            });
            if (index >= 0) {
                vm.listado.splice(index, 1);
                vm.list();
            } else {
                notify.add('Elemento no encontrado.');
            }
        };

        vm.cancel = function () {
            vm.elemento = {};
            idOriginal = null;
            vm.list();
            $location.url(urlList);
        };
        vm.send = function () {
            switch (vm.modo) {
                case 'add':
                    vm.listado.push(vm.elemento);
                    vm.cancel();
                    break;
                case 'edit':
                    var index = vm.listado.findIndex(function (item) {
                        return item[pk] == idOriginal;
                    });
                    if (index >= 0) {
                        vm.listado[index] = vm.elemento;
                        vm.cancel();
                    } else {
                        notify.add('Elemento no encontrado.');
                    }
                    break;
                case 'view':
                    vm.cancel();
                    break;
            }
        };
        vm.list();
        if($routeParams.id) {
            if($location.url().endsWith('/edit'))
                vm.edit($routeParams.id);
            else
                vm.view($routeParams.id);
        } else {
            if($location.url().endsWith('/add'))
                vm.add();
            else
                vm.list();
        }
    }]);