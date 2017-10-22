'use strict';

(function () {
    angular
        .module('aD_technical_challenge')
        .controller('IndexController', IndexController);

    function IndexController(IndexService, $localStorage, uuid) {
        let model = this;
        model.prev = "";
        model.searchDNA = searchDNA;
        model.clearConsole = clearConsole;


        function init() {
            if ($localStorage.current){
                for(let index in $localStorage.current)
                    searchDNA(index)
            } else{
                $localStorage.current={}
            }

            if ($localStorage.result) {
                for (let index in $localStorage.result)
                    model.prev += "<br/>" + index + ":" + $localStorage.result[index];
            } else {
                $localStorage.result = {};
            }
            console.log($localStorage);
        }

        init();

        function searchDNA(dna) {

            if(dna ==="" || dna===undefined || !isNaN(dna)){
                alert("Please enter a valid value");
                return;
            }
            let id = uuid.v1();
            $localStorage["current"][dna]="Searching";
            /*
            Create a new para element for each search in the current execution dialog. Creating an element this way
            makes it easier to update the value once the promise returns
             */
           generateHTMLElement(id, dna);

            /*
            Function call to initiate the search
             */
            IndexService.searchDNA(dna)
                .then(function (response) {
                    if (response.data.list === "Unavailable") {
                        document.getElementById("output-console-current").getElementsByClassName(id)[0].innerHTML = dna
                            + ": Not found";
                        $localStorage.result[dna] = "Not found";

                    } else {
                        document.getElementById("output-console-current").getElementsByClassName(id)[0].innerHTML = dna
                            + " :" + JSON.stringify(response.data)
                        /*
                        If the sequence was previously found in some other protein, append the new protein to the
                        existing list
                         */
                        if ($localStorage.result.hasOwnProperty(dna)) {
                            if (!$localStorage.result[dna].includes(JSON.stringify(response.data)))
                                $localStorage.result[dna] = $localStorage.result[dna] + "," +
                                    JSON.stringify(response.data);

                        }
                        else {
                            $localStorage.result[dna] = JSON.stringify(response.data);
                        }
                    }
                    delete $localStorage.current[dna]
                });
        }


        function clearConsole() {
            document.getElementById("output-console-current").innerHTML = "";
        }


        function generateHTMLElement(id, dna) {
            let para = document.createElement("p");
            para.setAttribute('class', id);
            let node = document.createTextNode(dna + ": Searching");
            para.appendChild(node);
            let element = document.getElementById("output-console-current");
            element.append(para);
        }


    }
})();
