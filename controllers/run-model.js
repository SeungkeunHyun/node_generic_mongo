String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var processRequest = (req, res) => {
    var col = req.params.col;
    var body = req.body;
    var mongoose = require('mongoose');
    require('../models/' + col);
    var model = mongoose.models[col.capitalize()];
    //console.log("process request: ", col, mongoose, model, body);
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