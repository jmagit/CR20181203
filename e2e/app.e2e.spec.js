describe('Primera prueba con Protractor', function() {
    it('introducir nombre y saludar', function() {
      browser.get('http://localhost:9000/');
      var txt = element(by.model('vm.nombre'));
      txt.clear();
      browser.sleep(5000);
      txt.sendKeys('Mundo');
      browser.sleep(5000);
      element(by.css('input[value="saluda"]')).click();
      expect(element(by.binding('vm.resultado')).getText()).
          toEqual('Hola Mundo'); 
      browser.sleep(5000);
    });
  });
  