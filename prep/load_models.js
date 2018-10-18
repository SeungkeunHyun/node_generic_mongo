const {ObjectID} = require('mongodb');
var {mongoose} = require('../db/mongoose');
var dicModel = {};
var fs = require('fs');
var path = require('path');
fs.readdir(path.join(__dirname, '../models'), (err, files) => {
    files.forEach(fname => {
        console.log(fname);
        let modelName = fname.split('.')[0];
        var model = require('../models/' + fname); //[modelName + 'Schema'];
        console.log(model, model.find);
        dicModel[modelName] = {model};
    });
    //console.log(dicModel);
});

module.exports = {dicModel};