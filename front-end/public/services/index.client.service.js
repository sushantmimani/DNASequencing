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
          let data = {
              dna:dna
          }
          return $http.post('http://127.0.0.1:5000',data)
              .then(function (response) {
                  return response;
              })
      }
  }
})();
