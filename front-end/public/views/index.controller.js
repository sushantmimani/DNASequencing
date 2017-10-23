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

            /*
            Reload any dna sequences that were being processed when the page was refreshed / closed
             */
            if ($localStorage.current) {
                for (let index in $localStorage.current)
                    searchDNA(index)
            } else {
                $localStorage.current = {}
            }

            /*
            Reload previous execution data.
             */
            if ($localStorage.result) {
                for (let index in $localStorage.result)
                    model.prev += "<br/>" + index + ":" + $localStorage.result[index];
            } else {
                $localStorage.result = {};
            }
        }

        init();

        function searchDNA(dna) {

            /*
            If invalid input, display an alert message to the user
             */
            if (dna === "" || dna === undefined || !isNaN(dna)) {
                alert("Please enter a valid value");
                return;
            }
            let id = uuid.v1();
            $localStorage["current"][dna] = "Searching";
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

                        /*
                        If the sequence is not found, store the execution result to reflect that it was not found
                         */
                        document.getElementById("output-console-current").getElementsByClassName(id)[0].innerHTML = dna
                            + ": Not found";
                        $localStorage.result[dna] = "Not found";

                    } else {
                        document.getElementById("output-console-current").getElementsByClassName(id)[0].innerHTML = dna
                            + " :" + JSON.stringify(response.data)
                        /*
                        If the sequence was previously found in some other protein, append the new protein to the
                        existing list, else create a new item
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
                    // If a dna has been processed, delete if form the object keeping track of 'in progress' DNAs
                    delete $localStorage.current[dna]
                });
        }


        function clearConsole() {
            document.getElementById("output-console-current").innerHTML = "";
        }

        /*
        Function to generate a new html paragraph element
         */
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
