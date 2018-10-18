require('./config/config.js');
var app = require('express')();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var modelRunner = require('./controllers/run-model');
console.log(modelRunner);

app.use(bodyParser.json());

app.post('/api/:col', urlencodedParser, (req, res) => {
    if(!req.body)
        return res.sendStatus(400);
    console.log(req.params.col);
    modelRunner.processRequest(req, res);
    res.sendStatus(200);
});

app.get('/api/:col', urlencodedParser, (req, res) => {
    if(!req.params.col) 
        return res.sendStatus(400);
    let msg = `get all documents of collection: ${req.params.col}`;
    modelRunner.processRequest(req, res);
    res.send(msg);
});

app.get('/api/:col/:id', urlencodedParser, (req, res) => {
    if(!req.params.col) 
        return res.sendStatus(400);
    let msg = `get a record of collection: ${req.params.col}, id: ${req.params.id}`;
    modelRunner.processRequest(req, res);
    res.send(msg);
});

var port = process.env.PORT;

app.listen(port, () => {
    console.log(`node is listening on ${port}`);
});