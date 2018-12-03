describe('Pruebas AngularJS', function () {
    beforeEach(module("MyApp"));
    it('Primera prueba', function () {
        expect(true).toBeTruthy();
    });
    // xit('Falla', function () {
    //     expect(false).toBeTruthy();
    // });

});
describe('Pruebas filtros', function () {
    beforeEach(module('MyCore'));
    var filtro;
    beforeEach(inject(function ($filter) {
        filtro = $filter('capitalize');
    }));
    it("Sin valor", function () {
        expect(filtro('')).toBe('');
        expect(filtro()).toBeUndefined();
    });
    it("Con todo en mayúsculas", function () {
        expect(filtro('HOLA MUNDO')).toBe("Hola mundo");
    });
    it("Con todo en minúsculas", function () {
        expect(filtro('hola mundo')).toBe("Hola mundo");
    });
    it("Una letra", function () {
        expect(filtro('a')).toBe('A');
    });
    it("Un numero", function () {
        expect(filtro('1234')).toBe('1234');
    });
});
describe('Demo de controlador', function () {
    var scope, ctrl;
    beforeEach(module('MyApp'));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller("myController", {
            $scope: scope
        });
    }));

    it('Saludar', function () {
        ctrl.nombre = 'Ciudad Real';
        ctrl.saluda();
        expect('Hola Ciudad Real').toBe(ctrl.resultado);
    });
    it('Despide', function () {
        ctrl.nombre = 'Ciudad Real';
        ctrl.despide();
        expect('Adios Ciudad Real').toBe(ctrl.resultado);
    });
});
describe("Pruebas de servicios", function() {
    beforeEach(module("MyApp"));
      
    var srv;
    beforeEach(inject(function(auth) {
        srv = auth;
    }));
    it("Sin usuario", function() {
      expect(srv.usuario).toBe("(anonimo)");
      expect(srv.isAuthenticated).toBeFalsy();
    });
    it("Autenticado", function() {
        srv.login('admin', '1234567890');
        expect(srv.usuario).toBe("admin");
        expect(srv.token).toBe("1234567890");
        expect(srv.isAuthenticated).toBeTruthy();
        srv.logout();
        expect(srv.usuario).toBe("(anonimo)");
        expect(srv.token).toBeNull();
        expect(srv.isAuthenticated).toBeFalsy();
        });
  });
