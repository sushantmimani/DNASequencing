'use strict';

(function () {
    angular
        .module('aD_technical_challenge')
        .controller('IndexController', IndexController);

    function IndexController(IndexService, $localStorage, uuid) {
        let model = this;
        model.dna = "";
        model.message = "DNA Sequencing <br/>";
        model.prev = "";
        model.searchDNA = searchDNA;
        model.clearHistory = clearHistory;
        model.clearConsole = clearConsole;


        function clearHistory() {
           $localStorage.$reset();
            model.prev = "";
            $localStorage.result = {}

        }

        function init() {
            if ($localStorage.result) {
                for (let index in $localStorage.result)
                    model.prev += "<br/>" + index + ":" + $localStorage.result[index];
            }
            else {
                $localStorage.result = {};
            }

            console.log($localStorage.result)

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
                        $localStorage.result[temp] = "Not found";
                        console.log($localStorage)

                    } else {
                        document.getElementById("output-console-current").getElementsByClassName(id)[0].innerHTML = temp
                            + " :" + JSON.stringify(response.data)
                        /*
                        If the sequence was previously found in some other protein, append the new protein to the
                        existing list
                         */
                        if ($localStorage.result.hasOwnProperty(temp)) {
                            if (!$localStorage.result[temp].includes(JSON.stringify(response.data)))
                                $localStorage.result[temp] = $localStorage.result[temp] + "," + JSON.stringify(response.data);

                        }
                        else {
                            $localStorage.result[temp] = JSON.stringify(response.data);
                        }
                    }
                })
            model.dna = "";

        }

        function clearConsole() {
            model.message = "DNA Sequencing";
        }


    }
})();
