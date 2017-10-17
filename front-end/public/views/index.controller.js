'use strict';

(function(){
  angular
    .module('aD_technical_challenge')
    .controller('IndexController', IndexController);

    function IndexController(IndexService, $localStorage, $sce){
      let model = this;
      model.dna = "";
      model.DNAList = {};
      model.message = "DNA Sequencing";
      model.prev = "";
      model.searchDNA = searchDNA;
      model.clearHistory = clearHistory;


      function clearHistory() {
          delete $localStorage.result;
          model.prev = "";
      }
      function init() {
          // delete $localStorage.result;
          if($localStorage.result) {

            model.DNAList=$localStorage.result;
            for(let index in $localStorage.result)
              model.prev+= "<br/>"+index+"---->"+$localStorage.result[index];
          }

          console.log(model.DNAList)
      }
      init();
      function searchDNA() {
          let temp = model.dna;
          IndexService.searchDNA(model.dna)
              .then(function (response) {
                  console.log(response.data);
                  model.message+= "<br/>"+temp+"------>"+response.data;
                  model.DNAList[temp]=response.data;
                  console.log(model.DNAList);
                  $localStorage.result = model.DNAList;
              })
          model.dna="";
      }

      model.clearConsole = function(){
        model.message = "DNA Sequencing";
      }


    }
})();
