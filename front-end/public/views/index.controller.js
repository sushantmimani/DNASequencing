'use strict';

(function () {
    angular
        .module('aD_technical_challenge')
        .controller('IndexController', IndexController);

    function IndexController(IndexService, $localStorage, uuid, $scope) {
        let model = this;
        model.dna = "";
        model.DNAList = {};
        model.message = "DNA Sequencing <br/>";
        model.prev = "";
        model.searchDNA = searchDNA;
        model.clearHistory = clearHistory;
        model.clearConsole = clearConsole;


        function clearHistory() {
           $localStorage.$reset();
            model.prev = "";
            model.DNAList = {}
        }

        function init() {
            if ($localStorage.result) {
                model.DNAList = $localStorage.result;
                for (let index in $localStorage.result)
                    model.prev += "<br/>" + index + ":" + $localStorage.result[index];
            }

        }

        init();

        function searchDNA() {
            let temp = model.dna;
            let id = uuid.v1();
            /*
            Create a new para element for each search in the current execution dialog. Creating an element this way
            makes it easier to update the value once the promise returns
             */
            var para = document.createElement("p");
            para.setAttribute('class', id);
            var node = document.createTextNode(temp + ": Searching");
            para.appendChild(node);
            var element = document.getElementById("output-console-current");
            element.append(para);

            /*
            Function call to initiate the search
             */
            IndexService.searchDNA(model.dna)
                .then(function (response) {
                    if (response.data.list === "Unavailable") {
                        document.getElementById("output-console-current").getElementsByClassName(id)[0].innerHTML = temp
                            + ": Not found";
                        model.DNAList[temp] = "Not found";

                    } else {
                        document.getElementById("output-console-current").getElementsByClassName(id)[0].innerHTML = temp
                            + " :" + JSON.stringify(response.data)
                        /*
                        If the sequence was previously found in some other protein, append the new protein to the
                        existing list
                         */
                        if (model.DNAList.hasOwnProperty(temp)) {
                            if (!model.DNAList[temp].includes(JSON.stringify(response.data)))
                                model.DNAList[temp] = model.DNAList[temp] + "," + JSON.stringify(response.data);

                        }
                        else {
                            model.DNAList[temp] = JSON.stringify(response.data);
                        }
                    }
                    $localStorage.result = model.DNAList;
                })
            model.dna = "";

        }

        function clearConsole() {
            model.message = "DNA Sequencing";
        }


    }
})();
