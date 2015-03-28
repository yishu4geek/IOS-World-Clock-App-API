module.exports = function(){

    var module = {};
    var City = require('../models/city');

//+++ methods +++
    module.findAll = function(req,res){

//        res.json([{name:'wine10000'},{name:'wine2'},{name:'wine3'}]);
        City.find(function(err,cities){
            if(err) res.send(err);

            res.jsonp(cities);

        })
    }



    module.findById = function(req,res){

        City.findById(req.params.id, function(err,city)
        {
            if(err) res.send(err);

            res.jsonp(city);
        })
    }

    return module;
}

