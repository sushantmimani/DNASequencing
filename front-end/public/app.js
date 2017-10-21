'use strict';

(function(){
  angular
      .module('aD_technical_challenge',['ngRoute','ngSanitize','ngStorage'])
      .directive('capitalize', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function(input) {
                return input ? input.toUpperCase() : "";
            });
            element.css("text-transform","uppercase");
        }
    };
})

})();
