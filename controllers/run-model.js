var _ = require("lodash");

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var processRequest = (req, res) => {
    var col = req.params.col;
    var body = _.pick(req.body, Object.keys(req.body));
    var {mongoose} = require('../db/mongoose');
    require('../models/' + col);
    console.log("mongoose: ", mongoose, col.capitalize());
    var model = mongoose.model(col.capitalize());
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
            return model.create(body);
        break;
        case "PUT":
        break;
        case "DELETE":
        break;
    }
}

module.exports = {processRequest};