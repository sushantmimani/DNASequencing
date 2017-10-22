'use strict';

(function(){
  angular
      .module('aD_technical_challenge',['ngRoute','ngSanitize','ngStorage','angular-uuid'])
      .directive('capitalize', function() {  // Directive to capitalize the input
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
