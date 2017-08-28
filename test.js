var mongoose = require('mongoose');
var parseString = require('xml2js').parseString;

mongoose.connect('mongodb://localhost:27017/test');
//var connection = mongoose.createConnection('mongodb://localhost:27017/test');
var Schema = mongoose.Schema;
var carSchema = new Schema({
  id: { type : String , unique : true, required : true},
  year: Number
});

var Car = mongoose.model('Car', carSchema);

var car = new Car({
    id: '102991',
    year: 11
  });

  car.save(function(err, suc){
    if (err) return console.error(err);
    console.log(suc);
  });

  return;