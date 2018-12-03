angular.module('MyCore', []);

angular.module('MyCore').filter("capitalize", function () {
    return function (s) {
      if (typeof(s)==="string") {
        return s.charAt(0).toUpperCase() + 
            s.substring(1, s.length).toLowerCase();
      }
      return s;
    };
  });

