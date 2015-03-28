var mongoose = require('mongoose');

// define the schema for wine model

var citySchema = mongoose.Schema ({
    id:{type:String,unique:true},
    cityName:String,
    timezoneName:String,
    timezoneOffset:Number
})


//Create the model for Wines and expose it to our app
module.exports = mongoose.model('City', citySchema);