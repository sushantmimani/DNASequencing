'use strict';

(function(){
  angular
  .module("aD_technical_challenge")
  .config(Conf);

function Conf($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'views/index.html',
      controller : 'IndexController',
      controllerAs : 'model'
    })
}
})();
