let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.use(bodyParser.json({type : 'application/json'}));
app.use(express.static('public'));
let listener = app.listen(3000, () => (console.log("Run http://127.0.0.1:3000 on your browser")));
