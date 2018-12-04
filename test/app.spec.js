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
describe("Pruebas de servicios", function () {
    beforeEach(module("MyApp"));

    var srv;
    beforeEach(inject(function (auth) {
        srv = auth;
    }));
    it("Sin usuario", function () {
        expect(srv.usuario).toBe("(anonimo)");
        expect(srv.isAuthenticated).toBeFalsy();
    });
    it("Autenticado", function () {
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
describe('Pruebas de directivas', function () {
    var $compile, $rootScope;

    beforeEach(module('MyApp'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Reemplaza el elemento con el contenido apropiado', function () {
        // Compilar el trozo de HTML que contiene la directiva
        var element = $compile('<div><my-saludo nombre="Ciudad Real"></my-saludo></div>')($rootScope);
        // Disparar todos los watches, por lo que la expresión {{1 + 1}} sera evaluada
        $rootScope.$digest();
        // Comprobar que el elemento compilado contiene el contenido de la plantilla
        expect(element.html()).toContain('<h1 nombre="Ciudad Real" class="ng-binding ng-isolate-scope">Hola Ciudad Real</h1>');
    });
});

describe('Pruebas del validador', function () {
    it('NIF Validos', function () {
        expect(esUnNIFValaido('1R')).toBeTruthy();
        expect(esUnNIFValaido('1234S')).toBeTruthy();
        expect(esUnNIFValaido('1234s')).toBeTruthy();
        expect(esUnNIFValaido('12345678Z')).toBeTruthy();
    });
    it('NIF Invalidos', function () {
        expect(esUnNIFValaido('1234')).toBeFalsy();
        expect(esUnNIFValaido('S1234')).toBeFalsy();
        expect(esUnNIFValaido('123456789Z')).toBeFalsy();
        expect(esUnNIFValaido()).toBeFalsy();
    });
});
describe('Directiva: lbl-title', function () {
    var $compile, $rootScope, scope;

    beforeEach(module('MyApp'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        scope.nombre = 'Pepito';

    }));

    it('Envoltorio simple: Input', function () {
        // Compilar el trozo de HTML que contiene la directiva
        var element = $compile('<div><input lbl-title="Nombre" type="text" ng-model="nombre"></div>')(scope);
        // Disparar todos los watches, por lo que la expresión {{1 + 1}} sera evaluada
        $rootScope.$digest();
        // Comprobar que el elemento compilado contiene el contenido de la plantilla
        expect(element.html()).toContain('<label>Nombre: <input type="text" ng-model="nombre" class="ng-pristine ng-untouched ng-valid ng-not-empty"></label>');
    });
    it('Envoltorio con class: Input', function () {
        // Compilar el trozo de HTML que contiene la directiva
        var element = $compile('<div><input lbl-title="Nombre" type="text" ng-model="nombre" class="kk"></div>')(scope);
        // Disparar todos los watches, por lo que la expresión {{1 + 1}} sera evaluada
        $rootScope.$digest();
        // Comprobar que el elemento compilado contiene el contenido de la plantilla
        expect(element.html()).toContain('<label class="kk">Nombre: <input type="text" ng-model="nombre" class="kk ng-pristine ng-untouched ng-valid ng-not-empty"></label>');
    });
    it('Envoltorio simple: Textarea', function () {
        // Compilar el trozo de HTML que contiene la directiva
        var element = $compile('<div><textarea lbl-title="Nombre" ng-model="nombre"></textarea></div>')(scope);
        // Disparar todos los watches, por lo que la expresión {{1 + 1}} sera evaluada
        $rootScope.$digest();
        // Comprobar que el elemento compilado contiene el contenido de la plantilla
        expect(element.html()).toContain('<label>Nombre: <textarea ng-model="nombre" class="ng-pristine ng-untouched ng-valid ng-not-empty"></textarea></label>');
    });
    it('Envoltorio simple: Select   ', function () {
        // Compilar el trozo de HTML que contiene la directiva
        var element = $compile('<div><select lbl-title="Nombre" ng-model="nombre"><option value="Pepito">Uno</option><option value="Grillo">Dos</option></select></div>')(scope);
        // Disparar todos los watches, por lo que la expresión {{1 + 1}} sera evaluada
        $rootScope.$digest();
        // Comprobar que el elemento compilado contiene el contenido de la plantilla
        expect(element.html()).toContain('<label>Nombre: <select ng-model="nombre" class="ng-pristine ng-untouched ng-valid ng-not-empty"><option value="Pepito" selected="selected">Uno</option><option value="Grillo">Dos</option></select></label>');
    });
});