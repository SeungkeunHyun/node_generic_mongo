require('./config/config.js');
var app = require('express')();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

app.use(bodyParser.json());

app.post('/api/:col', urlencodedParser, (req, res) => {
    if(!req.body)
        return res.sendStatus(400);
    console.log(req.params.col);
});

app.get('/api/:col', urlencodedParser, (req, res) => {
    if(!req.params.col) 
        return res.sendStatus(400);
    let msg = `get all documents of collection: ${req.params.col}`;
    console.log(msg);
    res.send(msg);
});

app.get('/api/:col/:id', urlencodedParser, (req, res) => {
    if(!req.params.col) 
        return res.sendStatus(400);
    let msg = `get a record of collection: ${req.params.col}, id: ${req.params.id}`;
    console.log(msg);
    res.send(msg);
});

var port = process.env.PORT;

app.listen(port, () => {
    console.log(`node is listening on ${port}`);
});