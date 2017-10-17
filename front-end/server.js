let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json({type : 'application/json'}));
app.use(express.static('public'));
let listener = app.listen(3000, () => (console.log("Listening on port 3000")));
