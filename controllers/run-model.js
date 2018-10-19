var _ = require("lodash");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var processRequest = (req, res) => {
    var col = req.params.col;
    var body = _.pick(req.body, Object.keys(req.body));
    var {mongoose} = require('../db/mongoose');
    var model = require('./../models/' + col);
    console.log("Collection: ", col.capitalize());
    console.log("process request: ", col, body);
    switch(req.method) {
        case "GET":
            if(req.params.id) {
                return model.findById(req.params.id);
            }
            return model.find();
        break;
        case "POST":
            console.log("request body:", body);
            console.log("model", model);
            return model.create(body);
        break;
        case "PUT":
        break;
        case "DELETE":
        break;
    }
}

module.exports = {processRequest};