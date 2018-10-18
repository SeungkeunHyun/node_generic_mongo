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
    var newRow = modelRunner.processRequest(req, res);
    newRow.then(nr=> {
        res.send(nr);
         return;
    }).catch(ex => {
        console.log(ex);
        res.status(500).send(ex.message);
    });
});

app.get('/api/:col', urlencodedParser, (req, res) => {
    if(!req.params.col) 
        return res.sendStatus(400);
    let msg = `get all documents of collection: ${req.params.col}`;
    var query = modelRunner.processRequest(req, res);
    query.exec((err, docs) => {
        console.log("entered then", err, docs);
        if(err) {
            res.sendStatus(400);
            return;
        }
        console.log(docs);
        res.send(docs);
    });
});

app.get('/api/:col/:id', urlencodedParser, (req, res) => {
    if(!req.params.col) 
        return res.sendStatus(400);
    let msg = `get a record of collection: ${req.params.col}, id: ${req.params.id}`;
    var query = modelRunner.processRequest(req, res);
    console.log('query', query);
    query.exec((err, docs) => {
        console.log("entered then");
        if(err) {
            res.sendStatus(400);
            return;
        }
        res.send(docs);
    });
});

var port = process.env.PORT;

app.listen(port, () => {
    console.log(`node is listening on ${port}`);
});