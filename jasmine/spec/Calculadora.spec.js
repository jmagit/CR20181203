describe("Demos de pruebas", function() {
    var calc;
    beforeEach(function() {
        calc = new Calculadora();
        calc.suma = function(a, b) {
            return a - b;
        };
    });
    describe("Pruebas de sumar", function() {
        it("Suma dos numeros", function() {
            var rslt = calc.suma(5, 5);
            expect(10).toBe(rslt);
            expect(0).toBe(calc.suma(5, -5));
            expect(0).toBe(calc.suma(-5, 5));
        });
        xit("Suma dos algos", function() {
            var rslt = calc.suma(5, "5");
            expect(10).toBe(rslt);
        });
    });
    describe("Pruebas de resta", function() {
        it("Resta dos numeros", function() {
            var rslt = calc.resta(5, 5);
            expect(0).toBe(rslt);
        });
        it("Resta dos algos", function() {
            var rslt = calc.resta(5, "5");
            expect(0).toBe(rslt);
        });
    });
});