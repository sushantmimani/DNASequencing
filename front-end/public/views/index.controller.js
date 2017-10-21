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
      model.clearConsole = clearConsole;
      let msg = {};


      function clearHistory() {
          delete $localStorage.result;
          model.prev = "";
      }
      function init() {
          // delete $localStorage.result;
          if($localStorage.result) {

            model.DNAList=$localStorage.result;
            for(let index in $localStorage.result)
              model.prev+= "<br/>"+index+":"+$localStorage.result[index];
          }

          console.log(model.DNAList)
      }
      init();
      function searchDNA() {
          let temp = model.dna;
          model.message+= "<br/>"+temp+":Searching";

          IndexService.searchDNA(model.dna)
              .then(function (response) {
                  if(response.data.list==="Unavailable"){
                      model.message+= "<br/>"+temp+":Not found";
                      model.DNAList[temp]="Unavailable";
                      msg[temp]="Unavailable";
                      console.log(JSON.stringify(msg));

                  } else {
                      model.message+= "<br/>"+temp+":"+JSON.stringify(response.data);
                      model.DNAList[temp]=JSON.stringify(response.data);
                      msg[temp]=response.data;
                      console.log(JSON.stringify(msg));
                  }
                  $localStorage.result = model.DNAList;
              })
          console.log("Starting")
          msg[model.dna]="Searching";
          console.log(JSON.stringify(msg))
          model.dna="";

      }

      function clearConsole(){
        model.message = "DNA Sequencing";
      }


    }
})();
