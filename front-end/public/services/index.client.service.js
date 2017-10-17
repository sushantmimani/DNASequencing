'use strict';

(function(){
  angular
    .module('aD_technical_challenge')
    .factory('IndexService', IndexService);

  function IndexService($http) {
      let api = {
          searchDNA: searchDNA,
      };
      return api;


      function searchDNA(dna) {
          return $http.get('http://127.0.0.1:5000')
              .then(function (response) {
                  return response;
              })
      }
  }
})();
