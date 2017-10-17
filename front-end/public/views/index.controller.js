'use strict';

(function(){
  angular
    .module('aD_technical_challenge')
    .controller('IndexController', IndexController);

    function IndexController(IndexService, $localStorage){
      let model = this;
      model.dna = "";
      model.DNAList = {};
      model.message = "DNA Sequencing";
      model.searchDNA = searchDNA;

      function searchDNA() {
          let temp = model.dna;
          IndexService.searchDNA(model.dna)
              .then(function (response) {
                  console.log(response.data);
                  model.message+= "<br/>"+temp+"------>"+response.data;
                  model.DNAList[temp]=response.data;
                  console.log(model.DNAList);
              })
          model.dna="";
      }



      model.clearConsole = function(){
        model.message = "DNA Sequencing";
      }


    }
})();
