var processRequest = (req, res) => {
    var col = req.params.col;
    var body = req.body;
    var model = require('../models/' + col);
    console.log("process request: ", col, model, body);
    switch(req.method) {
        case "GET":
            if(req.params.id) {
                return model.findById(req.params.id);
            }
            return model.find();
        break;
        case "POST":
            model.insert(body);
        break;
        case "PUT":
        break;
        case "DELETE":
        break;
    }
}

module.exports = {processRequest};