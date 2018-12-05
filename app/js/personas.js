angular.module("MyApp").factory('PersonasDAO', ['$http', function ($http) {
    var baseUrl = 'http://localhost:4321/ws/personas';
    var config = { withCredentials: true };
    return {
        query: function () {
            return $http.get(baseUrl, config);
        },
        get: function (id) {
            return $http.get(baseUrl + '/' + id, config);
        },
        add: function (item) {
            return $http.post(baseUrl, item, config);
        },
        change: function (id, item) {
            return $http.put(baseUrl + '/' + id, item, config);
        },
        remove: function (id) {
            return $http.delete(baseUrl + '/' + id, config);
        }
    };
}]);

angular.module('MyApp').controller('PersonasController',
    ['$window', 'PersonasDAO', 'NotificationService', '$routeParams', '$location',
        function ($window, dao, notify, $routeParams, $location) {
            var vm = this;

            vm.modo = 'list';
            vm.listado = null;
            vm.elemento = {};
            var idOriginal = null;
            var urlList = '/personas';

            vm.list = function () {
                dao.query().then(
                    function(resp) {
                        vm.listado = resp.data;
                        vm.modo = 'list';
                    },
                    function(resp) {
                        notify.add(resp.statusText);
                    }
                );
            };

            vm.add = function () {
                vm.elemento = {};
                vm.modo = 'add';
            };
            vm.edit = function (key) {
                dao.get(key).then(
                    function(resp) {
                        vm.elemento = resp.data;
                        idOriginal = key;
                        vm.modo = 'edit';
                    },
                    function(resp) {
                        notify.add(resp.statusText);
                    }
                );
            };
            vm.view = function (key) {
                dao.get(key).then(
                    function(resp) {
                        vm.elemento = resp.data;
                        vm.modo = 'view';
                    },
                    function(resp) {
                        notify.add(resp.statusText);
                    }
                );
            };
            vm.delete = function (key) {
                // if (!$window.confirm('¿Seguro?')) return;
                dao.remove(key).then(
                    function(resp) {
                        vm.list();
                    },
                    function(resp) {
                        notify.add(resp.statusText);
                    }
                );
            };

            vm.cancel = function () {
                vm.elemento = {};
                idOriginal = null;
                $location.url(urlList);
            };
            vm.send = function () {
                switch (vm.modo) {
                    case 'add':
                        dao.add(vm.elemento).then(
                            function(resp) {
                                vm.cancel();
                            },
                            function(resp) {
                                notify.add(resp.statusText);
                            }
                        );
                        break;
                    case 'edit':
                        dao.change(idOriginal, vm.elemento).then(
                            function(resp) {
                                vm.cancel();
                            },
                            function(resp) {
                                notify.add(resp.statusText);
                            }
                        );
                        break;
                    case 'view':
                        vm.cancel();
                        break;
                }
            };

            if ($routeParams.id) {
                if ($location.url().endsWith('/edit'))
                    vm.edit($routeParams.id);
                else
                    vm.view($routeParams.id);
            } else {
                if ($location.url().endsWith('/add'))
                    vm.add();
                else
                    vm.list();
            }
        }
    ]);